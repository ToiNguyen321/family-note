import React, { useEffect, useMemo, useRef } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { FAMILY_DATA } from './data';
import { LEVEL_GAP, NODE_WIDTH, SIBLING_GAP } from './layout';
import { TreeLines } from './TreeLines';
import { TreeNode } from './TreeNode';

const { width: SCREEN_W } = Dimensions.get('window');

export default function FamilyTree() {
  const scrollRef = useRef<ScrollView>(null);

  const { nodes, links, canvasWidth, canvasHeight } = useMemo(() => {
    const map = new Map(FAMILY_DATA.map(n => [n.id, n]));

    const getLevel = (n: any): number =>
      n.parents?.length
        ? 1 + Math.max(...n.parents.map(p => getLevel(map.get(p))))
        : 0;

    const levels: Record<number, any[]> = {};
    FAMILY_DATA.forEach(n => {
      const lvl = getLevel(n);
      levels[lvl] = [...(levels[lvl] || []), n];
    });

    const levelWidths = Object.values(levels).map(
      l => l.length * NODE_WIDTH + (l.length - 1) * SIBLING_GAP,
    );

    const canvasWidth = Math.max(...levelWidths) + 200;
    const canvasHeight = Object.keys(levels).length * LEVEL_GAP + 200;

    const positions: Record<string, { x: number; y: number }> = {};

    Object.entries(levels).forEach(([lvl, arr]) => {
      const totalWidth =
        arr.length * NODE_WIDTH + (arr.length - 1) * SIBLING_GAP;
      const startX = (canvasWidth - totalWidth) / 2;

      arr.forEach((n, i) => {
        positions[n.id] = {
          x: startX + i * (NODE_WIDTH + SIBLING_GAP),
          y: Number(lvl) * LEVEL_GAP,
        };
      });
    });

    const links = FAMILY_DATA.filter(n => n.parents?.length).map(n => ({
      parents: n.parents!.map(id => positions[id]),
      child: positions[n.id],
    }));

    return {
      nodes: FAMILY_DATA.map(n => ({ ...n, ...positions[n.id] })),
      links,
      canvasWidth,
      canvasHeight,
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: Math.max(0, canvasWidth / 2 - SCREEN_W / 2),
        y: 0,
        animated: false,
      });
    }, 0);
  }, [canvasWidth]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      contentContainerStyle={{ width: canvasWidth }}
    >
      <ScrollView contentContainerStyle={{ height: canvasHeight }}>
        <View>
          <TreeLines links={links} width={canvasWidth} height={canvasHeight} />
          {nodes.map(n => (
            <TreeNode key={n.id} {...n} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
