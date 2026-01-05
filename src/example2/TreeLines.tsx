import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { NODE_HEIGHT, NODE_WIDTH } from './layout';

export function TreeLines({
  links,
  width,
  height,
}: {
  links: {
    parents: { x: number; y: number }[];
    child: { x: number; y: number };
  }[];
  width: number;
  height: number;
}) {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute' }}>
      {links.map((l, i) => {
        // 2 parents → nối chung
        if (l.parents.length === 2) {
          const [p1, p2] = l.parents;

          const x1 = p1.x + NODE_WIDTH / 2;
          const x2 = p2.x + NODE_WIDTH / 2;
          const yParent = p1.y + NODE_HEIGHT;
          const yChild = l.child.y;

          const midY = yParent + 30;

          const d = `
            M ${x1} ${yParent}
            H ${x2}
            V ${midY}
            H ${l.child.x + NODE_WIDTH / 2}
            V ${yChild}
          `;

          return (
            <Path
              key={i}
              d={d}
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          );
        }

        // 1 parent → nối thẳng
        const p = l.parents[0];
        const d = `
          M ${p.x + NODE_WIDTH / 2} ${p.y + NODE_HEIGHT}
          V ${l.child.y}
        `;

        return (
          <Path
            key={i}
            d={d}
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        );
      })}
    </Svg>
  );
}
