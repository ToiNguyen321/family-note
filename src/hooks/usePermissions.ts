/**
 * Hook quản lý phân quyền
 */

import { useState, useCallback, useMemo } from 'react';
import {
  Permission,
  FamilyRole,
  Person,
} from '../types';
import {
  canView,
  canEdit,
  canDelete,
  canApprove,
  isAdmin,
  createDefaultPermission,
  canEditPerson,
} from '../services/permissionService';

export const usePermissions = (userId: string, initialRole: FamilyRole = FamilyRole.GUEST) => {
  const [permission, setPermission] = useState<Permission>(
    createDefaultPermission(userId, initialRole)
  );

  // Cập nhật role
  const updateRole = useCallback((role: FamilyRole) => {
    setPermission(createDefaultPermission(userId, role));
  }, [userId]);

  // Kiểm tra các quyền
  const hasViewPermission = useMemo(() => canView(permission), [permission]);
  const hasEditPermission = useMemo(() => canEdit(permission), [permission]);
  const hasDeletePermission = useMemo(() => canDelete(permission), [permission]);
  const hasApprovePermission = useMemo(() => canApprove(permission), [permission]);
  const isUserAdmin = useMemo(() => isAdmin(permission), [permission]);

  // Kiểm tra có thể chỉnh sửa thành viên cụ thể
  const canEditSpecificPerson = useCallback(
    (person: Person) => {
      return canEditPerson(permission, person);
    },
    [permission]
  );

  return {
    permission,
    hasViewPermission,
    hasEditPermission,
    hasDeletePermission,
    hasApprovePermission,
    isUserAdmin,
    updateRole,
    canEditSpecificPerson,
  };
};
