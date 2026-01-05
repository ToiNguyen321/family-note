import React, { JSX } from 'react';
import { Line } from 'react-native-svg';
import { PositionedNode } from './layoutTree';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;

export function renderLines(node: PositionedNode): JSX.Element[] {
  if (!node.children || node.children.length === 0) {
    return [];
  }

  const lines: JSX.Element[] = [];

  const parentCenterX = node.x + NODE_WIDTH / 2;
  const parentBottomY = node.y + NODE_HEIGHT;

  // 1️⃣ Vertical line từ cha xuống
  const connectorY = parentBottomY + 30;

  lines.push(
    <Line
      key={`${node.id}-down`}
      x1={parentCenterX}
      y1={parentBottomY}
      x2={parentCenterX}
      y2={connectorY}
      stroke="#000"
    />,
  );

  // 2️⃣ Horizontal line nối các con
  const firstChild = node.children[0];
  const lastChild = node.children[node.children.length - 1];

  const startX = firstChild.x + NODE_WIDTH / 2;
  const endX = lastChild.x + NODE_WIDTH / 2;

  lines.push(
    <Line
      key={`${node.id}-horizontal`}
      x1={startX}
      y1={connectorY}
      x2={endX}
      y2={connectorY}
      stroke="#000"
    />,
  );

  // 3️⃣ Vertical lines xuống từng con
  node.children.forEach(child => {
    const childCenterX = child.x + NODE_WIDTH / 2;

    lines.push(
      <Line
        key={`${node.id}-${child.id}-up`}
        x1={childCenterX}
        y1={connectorY}
        x2={childCenterX}
        y2={child.y}
        stroke="#000"
      />,
    );

    // Đệ quy cho đời sau
    lines.push(...renderLines(child));
  });

  return lines;
}
