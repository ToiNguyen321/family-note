import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Image,
  Line,
  Path,
  Rect,
  Text,
} from 'react-native-svg';

/* ================= DATA ================= */

type Person = {
  id: string;
  name: string;
  avatar: string;
  birth?: number;
  job?: string;
  parents?: string[];
};

const DATA: Person[] = [
  {
    id: 'ong',
    name: 'Ông Nội',
    birth: 1940,
    job: 'GV',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'ba',
    name: 'Bà Nội',
    birth: 1943,
    job: 'Nội trợ',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },

  {
    id: 'cha',
    name: 'Cha',
    birth: 1968,
    job: 'Kỹ sư',
    avatar: 'https://i.pravatar.cc/150?img=3',
    parents: ['ong', 'ba'],
  },
  {
    id: 'me',
    name: 'Mẹ',
    birth: 1970,
    job: 'Kế toán',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },

  {
    id: 'con1',
    name: 'Anh Cả',
    birth: 1993,
    job: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    parents: ['cha', 'me'],
  },
  {
    id: 'con2',
    name: 'Con Thứ',
    birth: 1997,
    job: 'Dev',
    avatar: 'https://i.pravatar.cc/150?img=6',
    parents: ['cha', 'me'],
  },
  {
    id: 'con3',
    name: 'Em Út',
    birth: 2001,
    job: 'SV',
    avatar: 'https://i.pravatar.cc/150?img=7',
    parents: ['cha', 'me'],
  },

  {
    id: 'chau',
    name: 'Cháu',
    birth: 2023,
    avatar: 'https://i.pravatar.cc/150?img=8',
    parents: ['con2'],
  },
];

/* ================= CONFIG ================= */

const NODE_W = 170;
const NODE_H = 210;
const LEVEL_GAP = 260;
const SIBLING_GAP = 80;

/* ================= LAYOUT ENGINE ================= */

function buildLayout(data: Person[]) {
  const positions: Record<string, { x: number; y: number }> = {};
  let cursorX = 0;

  const siblingGroups = new Map<string, Person[]>();

  data.forEach(p => {
    if (!p.parents) return;
    const key = p.parents.slice().sort().join('-');
    siblingGroups.set(key, [...(siblingGroups.get(key) || []), p]);
  });

  function place(person: Person, level: number) {
    if (positions[person.id]) return positions[person.id];

    const group = [...siblingGroups.entries()].find(([k]) =>
      k.split('-').includes(person.id),
    );

    let x: number;

    if (!group) {
      x = cursorX;
      cursorX += NODE_W + SIBLING_GAP;
    } else {
      const [, siblings] = group;
      const xs = siblings.map(s => place(s, level + 1).x);
      x = (Math.min(...xs) + Math.max(...xs)) / 2;
    }

    positions[person.id] = { x, y: level * LEVEL_GAP };
    return positions[person.id];
  }

  data.filter(p => !p.parents).forEach(p => place(p, 0));

  return { positions, siblingGroups };
}

/* ================= UI ================= */

export default function FamilyTreeScreen() {
  const { positions, siblingGroups } = useMemo(() => buildLayout(DATA), []);

  return (
    <ScrollView horizontal>
      <ScrollView>
        <Svg width={2500} height={2000}>
          <Defs>
            {DATA.map(p => (
              <ClipPath key={p.id} id={`clip-${p.id}`}>
                <Circle cx="50" cy="50" r="50" />
              </ClipPath>
            ))}
          </Defs>

          {/* Lines */}
          {[...siblingGroups.entries()].map(([key, children]) => {
            const parents = key
              .split('-')
              .map(id => positions[id])
              .filter(Boolean);

            if (!parents.length) return null;

            const barY = parents[0].y + NODE_H + 30;
            const xs = children.map(c => positions[c.id].x + NODE_W / 2);

            return (
              <G key={key}>
                {parents.map((p, i) => (
                  <Path
                    key={i}
                    d={`M${p.x + NODE_W / 2} ${p.y + NODE_H}
                        C${p.x + NODE_W / 2} ${barY - 40},
                         ${(Math.min(...xs) + Math.max(...xs)) / 2} ${
                      barY - 40
                    },
                         ${(Math.min(...xs) + Math.max(...xs)) / 2} ${barY}`}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    fill="none"
                  />
                ))}

                <Line
                  x1={Math.min(...xs)}
                  y1={barY}
                  x2={Math.max(...xs)}
                  y2={barY}
                  stroke="#9CA3AF"
                  strokeWidth={2}
                />

                {children.map(c => (
                  <Line
                    key={c.id}
                    x1={positions[c.id].x + NODE_W / 2}
                    y1={barY}
                    x2={positions[c.id].x + NODE_W / 2}
                    y2={positions[c.id].y}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                  />
                ))}
              </G>
            );
          })}

          {/* Cards */}
          {DATA.map(p => {
            const pos = positions[p.id];
            return (
              <G key={p.id}>
                <Rect
                  x={pos.x}
                  y={pos.y}
                  rx={20}
                  ry={20}
                  width={NODE_W}
                  height={NODE_H}
                  fill="#fff"
                  stroke="#E5E7EB"
                />

                <Image
                  x={pos.x + 35}
                  y={pos.y + 16}
                  width={100}
                  height={100}
                  href={{ uri: p.avatar }}
                  clipPath={`url(#clip-${p.id})`}
                />

                <Text
                  x={pos.x + NODE_W / 2}
                  y={pos.y + 145}
                  fontSize={14}
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {p.name}
                </Text>

                <Text
                  x={pos.x + NODE_W / 2}
                  y={pos.y + 165}
                  fontSize={12}
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  {p.birth} • {p.job ?? ''}
                </Text>
              </G>
            );
          })}
        </Svg>
      </ScrollView>
    </ScrollView>
  );
}
