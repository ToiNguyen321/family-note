// familyData.ts
export type FamilyNode = {
  id: string;
  name: string;
  generation: number;
  role?: string;
  avatar?: string;
  birth?: number;
  death?: number;
  hometown?: string;
  note?: string;
  children?: FamilyNode[];
};

export const familyTree: FamilyNode = {
  id: '1',
  name: 'Nguyễn Văn Thủy',
  generation: 1,
  role: 'Thủy tổ',
  birth: 1850,
  death: 1920,
  hometown: 'Nam Định',
  note: 'Khai cơ lập nghiệp',
  avatar: 'https://i.pravatar.cc/150?img=3',
  children: [
    {
      id: '2',
      name: 'Nguyễn Văn Trưởng',
      generation: 2,
      role: 'Trưởng nam',
      birth: 1880,
      death: 1955,
      avatar: 'https://i.pravatar.cc/150?img=12',
      children: [
        {
          id: '3',
          name: 'Nguyễn Văn An',
          generation: 3,
          birth: 1910,
          death: 1985,
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
        {
          id: '4',
          name: 'Nguyễn Văn Bình',
          generation: 3,
          birth: 1915,
          avatar: 'https://i.pravatar.cc/150?img=18',
        },
      ],
    },
    {
      id: '5',
      name: 'Nguyễn Văn Thứ',
      generation: 2,
      role: 'Thứ nam',
      birth: 1885,
      death: 1960,
      avatar: 'https://i.pravatar.cc/150?img=22',
      children: [
        {
          id: '6',
          name: 'Nguyễn Văn Cường',
          generation: 3,
          birth: 1920,
          avatar: 'https://i.pravatar.cc/150?img=25',
        },
      ],
    },
  ],
};
