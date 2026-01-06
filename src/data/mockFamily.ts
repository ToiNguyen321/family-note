import { Person, PersonStatus } from '@/types';

/**
 * Tạo mock data ~7 đời với tổng ~100 thành viên.
 * Cấu trúc:
 *  - Đời 0: 1 cặp gốc
 *  - Đời 1: 4 con (+ 4 dâu/rể)
 *  - Đời 2: 12 con (+ 12 dâu/rể)
 *  - Đời 3: 24 con (+ 24 dâu/rể)
 *  - Đời 4: 9 con (+ 9 dâu/rể) => Tổng xấp xỉ 100
 */

type Couple = { husbandId: string; wifeId: string };

const avatarPool = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=60',
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60',
];

const pickAvatar = (index: number) => avatarPool[index % avatarPool.length];

const makeId = (gen: number, idx: number) => `g${gen}-${idx}`;

const makePerson = ({
  id,
  name,
  birthYear,
  deathYear,
  status,
  role,
  hometown,
  spouseId,
  parentIds,
}: {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  status: PersonStatus;
  role?: string;
  hometown?: string;
  spouseId?: string;
  parentIds?: string[];
}): Person => ({
  id,
  fullName: name,
  avatar: pickAvatar(
    Math.abs(id.split('-').reduce((a, b) => a + b.charCodeAt(0), 0)),
  ),
  dateOfBirth: `${birthYear}-06-15`,
  dateOfDeath: deathYear ? `${deathYear}-11-05` : undefined,
  hometown: hometown ?? 'Hà Nội',
  clan: 'Nguyễn',
  role,
  status,
  biography: '',
  notes: '',
  achievements: [],
  spouseId,
  parentIds: parentIds ?? [],
  childrenIds: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const generateMockFamily = (): Person[] => {
  const persons: Record<string, Person> = {};
  const couples: Couple[] = [];

  // Đời 0: cặp gốc
  const rootId = makeId(0, 0);
  const rootSpouseId = `${rootId}-s`;
  persons[rootId] = makePerson({
    id: rootId,
    name: 'Ông Tổ Nguyễn Văn Lâm',
    birthYear: 1930,
    deathYear: 2010,
    status: PersonStatus.DECEASED,
    role: 'Tộc trưởng',
    hometown: 'Nghệ An',
    spouseId: rootSpouseId,
  });
  persons[rootSpouseId] = makePerson({
    id: rootSpouseId,
    name: 'Bà Tổ Trần Thị Hoa',
    birthYear: 1933,
    deathYear: 2015,
    status: PersonStatus.DECEASED,
    role: 'Tộc mẫu',
    hometown: 'Nghệ An',
    spouseId: rootId,
  });
  couples.push({ husbandId: rootId, wifeId: rootSpouseId });

  // Định nghĩa số con mỗi đời (chỉ tính con ruột, chưa tính dâu/rể)
  const generationPlan = [4, 12, 24, 9]; // Đời 1..4

  let currentGenParents: Couple[] = [...couples];

  generationPlan.forEach((childCount, genIndex) => {
    const gen = genIndex + 1; // đời bắt đầu từ 1
    const childrenIds: string[] = [];
    const newCouples: Couple[] = [];

    for (let i = 0; i < childCount; i++) {
      const parentCouple = currentGenParents[i % currentGenParents.length];
      const childId = makeId(gen, i);
      const spouseId = `${childId}-s`;

      const birthYear = 1930 + gen * 25 + Math.floor(i / 3);
      const isDeceased = gen <= 1; // Đời 1 có thể đã mất, các đời sau còn sống

      persons[childId] = makePerson({
        id: childId,
        name: `Thành viên đời ${gen} - ${i + 1}`,
        birthYear,
        deathYear: isDeceased ? birthYear + 70 : undefined,
        status: isDeceased ? PersonStatus.DECEASED : PersonStatus.ALIVE,
        role: gen === 1 && i === 0 ? 'Trưởng nam' : undefined,
        parentIds: [parentCouple.husbandId, parentCouple.wifeId],
      });

      persons[spouseId] = makePerson({
        id: spouseId,
        name: `Phối ngẫu đời ${gen} - ${i + 1}`,
        birthYear: birthYear + 1,
        status: PersonStatus.ALIVE,
        role: 'Phối ngẫu',
        parentIds: [],
        spouseId: childId,
      });

      // cập nhật spouseId cho child
      persons[childId].spouseId = spouseId;

      childrenIds.push(childId);
      newCouples.push({ husbandId: childId, wifeId: spouseId });

      // gán child cho cha mẹ
      [parentCouple.husbandId, parentCouple.wifeId].forEach(pid => {
        persons[pid].childrenIds.push(childId);
      });
    }

    currentGenParents = newCouples;
  });

  return Object.values(persons);
};

export const mockFamilyMembers: Person[] = generateMockFamily();
