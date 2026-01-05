// PersonNode.tsx
import React from 'react';
import { Circle, G, Image, Rect, Text } from 'react-native-svg';
import { PositionedNode } from './layoutTree';

const NODE_WIDTH = 220;
const NODE_HEIGHT = 120;
const AVATAR_SIZE = 48;

export const PersonNode = ({ node }: { node: PositionedNode }) => {
  return (
    <G x={node.x} y={node.y}>
      {/* Shadow */}
      <Rect
        x={2}
        y={2}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={12}
        fill="#000"
        opacity={0.08}
      />

      {/* Card */}
      <Rect
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={12}
        fill="#FFFDF7"
        stroke="#C9A24D"
        strokeWidth={2}
      />

      {/* Avatar */}
      {node.avatar ? (
        <>
          <Circle
            cx={AVATAR_SIZE / 2 + 12}
            cy={AVATAR_SIZE / 2 + 12}
            r={AVATAR_SIZE / 2 + 2}
            fill="#C9A24D"
          />
          <Image
            href={{ uri: node.avatar }}
            x={12}
            y={12}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            clipPath="circle()"
          />
        </>
      ) : null}

      {/* Name */}
      <Text
        x={AVATAR_SIZE + 28}
        y={28}
        fontSize={15}
        fontWeight="bold"
        fill="#2C2C2C"
      >
        {node.name}
      </Text>

      {/* Role / Generation */}
      <Text x={AVATAR_SIZE + 28} y={46} fontSize={12} fill="#8B6B2E">
        {node.role ?? `Đời thứ ${node.generation}`}
      </Text>

      {/* Birth - Death */}
      {(node.birth || node.death) && (
        <Text x={16} y={78} fontSize={12} fill="#444">
          {node.birth ?? '?'} – {node.death ?? 'nay'}
        </Text>
      )}

      {/* Hometown */}
      {node.hometown && (
        <Text x={16} y={96} fontSize={11} fill="#666">
          Quê: {node.hometown}
        </Text>
      )}

      {/* Note */}
      {node.note && (
        <Text x={16} y={112} fontSize={11} fill="#777">
          {node.note}
        </Text>
      )}
    </G>
  );
};
