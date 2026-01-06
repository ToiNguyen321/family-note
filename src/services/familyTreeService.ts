/**
 * Service xử lý cây gia phả
 */

import { Person, FamilyTreeNode, Relationship } from '../types';

/**
 * Tìm thành viên theo ID
 */
export const findPersonById = (
  members: Person[],
  id: string
): Person | undefined => {
  return members.find((m) => m.id === id);
};

/**
 * Lấy con cái của một thành viên
 */
export const getChildren = (members: Person[], parentId: string): Person[] => {
  return members.filter((m) => m.parentIds.includes(parentId));
};

/**
 * Lấy cha mẹ của một thành viên
 */
export const getParents = (members: Person[], personId: string): Person[] => {
  const person = findPersonById(members, personId);
  if (!person) return [];

  return members.filter((m) => person.parentIds.includes(m.id));
};

/**
 * Lấy vợ/chồng
 */
export const getSpouse = (members: Person[], personId: string): Person | undefined => {
  const person = findPersonById(members, personId);
  if (!person || !person.spouseId) return undefined;

  return findPersonById(members, person.spouseId);
};

/**
 * Tìm thành viên gốc (không có cha mẹ)
 */
export const findRootPerson = (members: Person[]): Person | undefined => {
  return members.find((m) => m.parentIds.length === 0);
};

/**
 * Xây dựng cây gia phả từ danh sách thành viên
 */
export const buildFamilyTree = (
  members: Person[],
  rootId?: string
): FamilyTreeNode | null => {
  if (members.length === 0) return null;

  const rootPersonId = rootId || findRootPerson(members)?.id;
  if (!rootPersonId) return null;

  const rootPerson = findPersonById(members, rootPersonId);
  if (!rootPerson) return null;

  const buildNode = (
    person: Person,
    level: number = 0
  ): FamilyTreeNode => {
    const children = getChildren(members, person.id);
    const childNodes = children.map((child) => buildNode(child, level + 1));

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

/**
 * Tính toán layout cho cây gia phả (thuật toán đơn giản)
 */
export const calculateLayout = (
  node: FamilyTreeNode,
  startX: number = 0,
  startY: number = 0,
  spacingX: number = 200,
  spacingY: number = 200
): FamilyTreeNode => {
  if (node.children.length === 0) {
    return {
      ...node,
      x: startX,
      y: startY,
    };
  }

  // Tính toán vị trí cho các con
  const childWidth = spacingX * Math.max(1, node.children.length);
  const childStartX = startX - childWidth / 2 + spacingX / 2;

  const updatedChildren = node.children.map((child, index) => {
    const childX = childStartX + index * spacingX;
    return calculateLayout(child, childX, startY + spacingY, spacingX, spacingY);
  });

  // Vị trí của node hiện tại ở giữa các con
  const avgChildX =
    updatedChildren.reduce((sum, child) => sum + child.x, 0) /
    updatedChildren.length;

  return {
    ...node,
    x: avgChildX,
    y: startY,
    children: updatedChildren,
  };
};

/**
 * Tìm tất cả thành viên trong một nhánh
 */
export const getBranchMembers = (
  members: Person[],
  branchRootId: string
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
      children.forEach((child) => collectMembers(child.id));
    }
  };

  collectMembers(branchRootId);
  return branchMembers;
};
