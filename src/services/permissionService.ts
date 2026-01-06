/**
 * Service xử lý phân quyền
 */

import { Permission, FamilyRole, Person } from '../types';

/**
 * Kiểm tra quyền xem
 */
export const canView = (permission: Permission): boolean => {
  return permission.canView;
};

/**
 * Kiểm tra quyền chỉnh sửa
 */
export const canEdit = (permission: Permission): boolean => {
  return permission.canEdit;
};

/**
 * Kiểm tra quyền xóa
 */
export const canDelete = (permission: Permission): boolean => {
  return permission.canDelete;
};

/**
 * Kiểm tra quyền duyệt
 */
export const canApprove = (permission: Permission): boolean => {
  return permission.canApprove;
};

/**
 * Kiểm tra có phải quản trị viên không
 */
export const isAdmin = (permission: Permission): boolean => {
  return (
    permission.role === FamilyRole.PATRIARCH ||
    permission.role === FamilyRole.ADMIN
  );
};

/**
 * Tạo permission mặc định theo role
 */
export const createDefaultPermission = (
  userId: string,
  role: FamilyRole
): Permission => {
  switch (role) {
    case FamilyRole.PATRIARCH:
    case FamilyRole.ADMIN:
      return {
        userId,
        role,
        canView: true,
        canEdit: true,
        canDelete: true,
        canApprove: true,
      };
    case FamilyRole.MEMBER:
      return {
        userId,
        role,
        canView: true,
        canEdit: false, // Chỉ đề xuất
        canDelete: false,
        canApprove: false,
      };
    case FamilyRole.GUEST:
      return {
        userId,
        role,
        canView: true,
        canEdit: false,
        canDelete: false,
        canApprove: false,
      };
    default:
      return {
        userId,
        role: FamilyRole.GUEST,
        canView: false,
        canEdit: false,
        canDelete: false,
        canApprove: false,
      };
  }
};

/**
 * Kiểm tra có thể chỉnh sửa thành viên cụ thể không
 */
export const canEditPerson = (
  permission: Permission,
  person: Person
): boolean => {
  if (!canEdit(permission)) return false;

  // Quản trị viên có thể chỉnh sửa tất cả
  if (isAdmin(permission)) return true;

  // Thành viên chỉ có thể chỉnh sửa thông tin của chính mình
  // TODO: Cần thêm userId vào Person hoặc so sánh với currentUser
  return false;
};
