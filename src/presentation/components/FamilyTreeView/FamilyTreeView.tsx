/**
 * FamilyTreeView: hiển thị cây gia phả với vị trí (x,y) từ layout, kèm đường nối quan hệ.
 * Dùng ScrollView kép (ngang + dọc) để pan; có thể mở rộng thêm zoom nếu cần.
 */

import { PersonNode } from '@/presentation/components/PersonNode';
import { FamilyTreeNode, Person } from '@/types';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface FamilyTreeViewProps {
  tree: FamilyTreeNode | null;
  onPersonPress?: (person: Person) => void;
  /** ID người dùng hiện tại để tính cách xưng hô (cháu, bác, anh, em, ...) */
  currentPersonId?: string;
  members?: Person[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const flattenNodes = (node: FamilyTreeNode): FamilyTreeNode[] => {
  const list: FamilyTreeNode[] = [];
  const stack: FamilyTreeNode[] = [node];
  while (stack.length) {
    const current = stack.pop() as FamilyTreeNode;
    list.push(current);
    current.children.forEach(child => stack.push(child));
  }
  return list;
};

const getRelationLabel = (
  currentId: string | undefined,
  targetId: string,
  nodes: FamilyTreeNode[],
  members?: Person[],
): string | undefined => {
  if (!currentId || !members) {
    return undefined;
  }

  if (currentId === targetId) {
    return 'Tôi';
  }

  const nodeMap = new Map<string, FamilyTreeNode>();
  nodes.forEach(n => nodeMap.set(n.person.id, n));

  const currentNode = nodeMap.get(currentId);
  const targetNode = nodeMap.get(targetId);
  if (!currentNode || !targetNode) {
    return undefined;
  }

  const levelDiff = targetNode.level - currentNode.level;

  const findPerson = (id: string) => members.find(m => m.id === id);

  const me = findPerson(currentId);
  const other = findPerson(targetId);

  const shareParent =
    !!me &&
    !!other &&
    me.parentIds.length &&
    other.parentIds.some(pid => me.parentIds.includes(pid));

  const shareGrandParent =
    !!me &&
    !!other &&
    me.parentIds.length &&
    other.parentIds.length &&
    me.parentIds.some(pid => other.parentIds.some(opid => opid === pid));

  // Cùng thế hệ
  if (levelDiff === 0) {
    if (shareParent) return 'Anh/Chị/Em';
    if (shareGrandParent) return 'Anh/Chị/Em họ';
    return 'Cùng thế hệ';
  }

  if (levelDiff === 1) return 'Con';
  if (levelDiff === 2) return 'Cháu';
  if (levelDiff === 3) return 'Chắt';
  if (levelDiff > 3) return `Hậu duệ đời +${levelDiff}`;

  if (levelDiff === -1) return 'Cha/Mẹ';
  if (levelDiff === -2) return 'Ông/Bà';
  if (levelDiff === -3) return 'Cụ';
  if (levelDiff < -3) return `Tổ tiên ${-levelDiff} đời`;

  return undefined;
};

const buildLinks = (node: FamilyTreeNode) => {
  const links: Array<{ from: FamilyTreeNode; to: FamilyTreeNode }> = [];
  const stack: FamilyTreeNode[] = [node];
  while (stack.length) {
    const current = stack.pop() as FamilyTreeNode;
    current.children.forEach(child => {
      links.push({ from: current, to: child });
      stack.push(child);
    });
  }
  return links;
};

export const FamilyTreeView: React.FC<FamilyTreeViewProps> = ({
  tree,
  onPersonPress,
  currentPersonId,
  members,
}) => {
  if (!tree) {
    return <View style={styles.empty} />;
  }

  const nodes = flattenNodes(tree);
  const links = buildLinks(tree);

  const padding = 80;
  const maxX = Math.max(...nodes.map(n => n.x + n.width)) + padding * 2;
  const maxY = Math.max(...nodes.map(n => n.y + n.height)) + padding * 2;
  const canvasWidth = Math.max(SCREEN_WIDTH, maxX);
  const canvasHeight = Math.max(SCREEN_HEIGHT, maxY);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReactNativeZoomableView
            zoomEnabled
            maxZoom={2.0}
            minZoom={0.3}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={false}
            style={[
              styles.zoomableView,
              { width: canvasWidth, height: canvasHeight },
            ]}
          >
            <View
              style={[
                styles.canvas,
                { width: canvasWidth, height: canvasHeight },
              ]}
            >
              <Svg
                width={canvasWidth}
                height={canvasHeight}
                style={StyleSheet.absoluteFill}
              >
                {links.map((link, index) => {
                  const fromX = padding + link.from.x + link.from.width / 2;
                  const fromY = padding + link.from.y + link.from.height;
                  const toX = padding + link.to.x + link.to.width / 2;
                  const toY = padding + link.to.y;

                  const midY = (fromY + toY) / 2;
                  const d = `M ${fromX} ${fromY} V ${midY} H ${toX} V ${toY}`;

                  return (
                    <Path
                      key={`link-${index}`}
                      d={d}
                      stroke="#999"
                      strokeWidth="2"
                      fill="none"
                    />
                  );
                })}
              </Svg>

              {nodes.map(node => {
                const relationLabel = getRelationLabel(
                  currentPersonId,
                  node.person.id,
                  nodes,
                  members,
                );
                return (
                  <PersonNode
                    key={node.person.id}
                    person={node.person}
                    x={padding + node.x}
                    y={padding + node.y}
                    width={node.width}
                    height={node.height}
                    onPress={onPersonPress}
                    scale={1}
                    relationLabel={relationLabel}
                  />
                );
              })}
            </View>
          </ReactNativeZoomableView>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  zoomableView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  canvas: {
    position: 'relative',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
