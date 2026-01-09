/**
 * Service xử lý cây gia phả
 */

import { FamilyTreeNode, Person } from '../types';

/**
 * Tìm thành viên theo ID
 */
export const findPersonById = (
  members: Person[],
  id: string,
): Person | undefined => {
  return members.find(m => m.id === id);
};

/**
 * Lấy con cái của một thành viên
 */
export const getChildren = (members: Person[], parentId: string): Person[] => {
  return members.filter(m => m.parentIds.includes(parentId));
};

/**
 * Lấy cha mẹ của một thành viên
 */
export const getParents = (members: Person[], personId: string): Person[] => {
  const person = findPersonById(members, personId);
  if (!person) return [];

  return members.filter(m => person.parentIds.includes(m.id));
};

/**
 * Lấy vợ/chồng
 */
export const getSpouse = (
  members: Person[],
  personId: string,
): Person | undefined => {
  const person = findPersonById(members, personId);
  if (!person || !person.spouseId) return undefined;

  return findPersonById(members, person.spouseId);
};

/**
 * Tìm thành viên gốc (không có cha mẹ)
 */
export const findRootPerson = (members: Person[]): Person | undefined => {
  return members.find(m => m.parentIds.length === 0);
};

/**
 * Xây dựng cây gia phả từ danh sách thành viên
 */
export const buildFamilyTree = (
  members: Person[],
  rootId?: string,
): FamilyTreeNode | null => {
  if (members.length === 0) return null;

  const rootPersonId = rootId || findRootPerson(members)?.id;
  if (!rootPersonId) return null;

  const rootPerson = findPersonById(members, rootPersonId);
  if (!rootPerson) return null;

  const buildNode = (person: Person, level: number = 0): FamilyTreeNode => {
    const children = getChildren(members, person.id);
    const childNodes = children.map(child => buildNode(child, level + 1));

    return {
      person,
      x: 0, // Sẽ được tính toán trong layout
      y: 0,
      width: 120,
      height: 150,
      children: childNodes,
      level,
    };
  };

  return buildNode(rootPerson);
};

const NODE_WIDTH = 80;
const NODE_HEIGHT = 100;
const SIBLING_GAP = 12;
const LEVEL_GAP = 45;

/**
 * Tính toán layout cho cây gia phả (thuật toán Reingold-Tilford cải tiến)
 */
export const calculateLayout = (
  node: FamilyTreeNode,
  depth: number = 0,
  cursor: { x: number } = { x: 0 },
): FamilyTreeNode => {
  // Reset cursor nếu là root (depth = 0 và x = 0 - giả định gọi lần đầu)
  // Tuy nhiên vì hàm đệ quy dùng chung cursor reference, ta không reset ở đây.
  // Người gọi hàm sẽ khởi tạo cursor.

  const children = node.children || [];

  // Duyệt đệ quy để tính vị trí các con trước (Bottom-Up / Post-order)
  const updatedChildren = children.map(child =>
    calculateLayout(child, depth + 1, cursor),
  );

  let x: number;

  if (updatedChildren.length === 0) {
    // Nếu là lá, đặt tại vị trí cursor hiện tại
    x = cursor.x;
    // Cập nhật cursor cho node lá tiếp theo
    cursor.x += NODE_WIDTH + SIBLING_GAP;
  } else {
    // Nếu có con, đặt cha ở giữa các con
    const firstChild = updatedChildren[0];
    const lastChild = updatedChildren[updatedChildren.length - 1];
    x = (firstChild.x + lastChild.x) / 2;

    // Edge case: Nếu node cha bị lệch quá xa sang trái so với cursor (do con cái lệch trái),
    // ta có thể cần đẩy cả cụm con sang phải?
    // Với thuật toán này, con cái luôn được đặt bắt đầu từ cursor, nên không bao giờ lấn sang trái của node trước đó.
    // Tuy nhiên, ta cần đảm bảo node cha không lấn sang node bên trái (nếu node bên trái là lá).
    // Với logic hiện tại: updatedChildren[0].x >= cursor_khi_bat_dau.
    // Và cursor luôn tăng.
    // Nên x luôn an toàn.
  }

  return {
    ...node,
    x,
    y: depth * (NODE_HEIGHT + LEVEL_GAP),
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    children: updatedChildren,
  };
};

/**
 * Tìm tất cả thành viên trong một nhánh
 */
export const getBranchMembers = (
  members: Person[],
  branchRootId: string,
): Person[] => {
  const branchMembers: Person[] = [];
  const visited = new Set<string>();

  const collectMembers = (personId: string) => {
    if (visited.has(personId)) return;
    visited.add(personId);

    const person = findPersonById(members, personId);
    if (person) {
      branchMembers.push(person);
      const children = getChildren(members, personId);
      children.forEach(child => collectMembers(child.id));
    }
  };

  collectMembers(branchRootId);
  return branchMembers;
};
