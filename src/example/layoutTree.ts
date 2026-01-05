import { FamilyNode } from './familyData';

// layoutTree.ts
const NODE_WIDTH = 220;
const NODE_HEIGHT = 120;
const H_GAP = 60;
const V_GAP = 160;

export type PositionedNode = FamilyNode & {
  x: number;
  y: number;
};

export function layoutTree(
  node: FamilyNode,
  depth = 0,
  cursor = { value: 0 },
): PositionedNode {
  const children = node.children ?? [];

  const positionedChildren = children.map(child =>
    layoutTree(child, depth + 1, cursor),
  );

  let x: number;
  if (positionedChildren.length === 0) {
    x = cursor.value;
    cursor.value += NODE_WIDTH + H_GAP;
  } else {
    x =
      (positionedChildren[0].x +
        positionedChildren[positionedChildren.length - 1].x) /
      2;
  }

  return {
    ...node,
    x,
    y: depth * V_GAP,
    children: positionedChildren,
  };
}
