export interface PersonNode {
  id: string;
  name: string;
  avatar: string;
  birthYear?: number;
  job?: string;
  parents?: string[];
}

export const FAMILY_DATA: PersonNode[] = [
  // ÔNG BÀ
  {
    id: 'ong',
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=1',
    birthYear: 1945,
    job: 'Giáo viên',
  },
  {
    id: 'ba',
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=2',
    birthYear: 1948,
    job: 'Nội trợ',
  },

  // CHA MẸ
  {
    id: 'cha',
    name: 'Nguyễn Văn C',
    avatar: 'https://i.pravatar.cc/150?img=3',
    birthYear: 1970,
    job: 'Kỹ sư',
    parents: ['ong', 'ba'],
  },
  {
    id: 'me',
    name: 'Lê Thị D',
    avatar: 'https://i.pravatar.cc/150?img=4',
    birthYear: 1972,
    job: 'Kế toán',
  },

  // CON
  {
    id: 'con1',
    name: 'Nguyễn Văn E',
    avatar: 'https://i.pravatar.cc/150?img=5',
    birthYear: 1995,
    job: 'Designer',
    parents: ['cha', 'me'],
  },
  {
    id: 'con2',
    name: 'Nguyễn Văn F',
    avatar: 'https://i.pravatar.cc/150?img=6',
    birthYear: 1998,
    job: 'Developer',
    parents: ['cha', 'me'],
  },
  {
    id: 'con3',
    name: 'Nguyễn Văn G',
    avatar: 'https://i.pravatar.cc/150?img=7',
    birthYear: 2002,
    job: 'Sinh viên',
    parents: ['cha', 'me'],
  },

  // CHÁU
  {
    id: 'chau1',
    name: 'Nguyễn Văn H',
    avatar: 'https://i.pravatar.cc/150?img=8',
    birthYear: 2022,
    parents: ['con2'],
  },

  // CHẮT
  {
    id: 'chat1',
    name: 'Nguyễn Văn I',
    avatar: 'https://i.pravatar.cc/150?img=9',
    birthYear: 2045,
    parents: ['chau1'],
  },
];
