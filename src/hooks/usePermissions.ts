/**
 * Hook quản lý phân quyền
 */

import { useCallback, useMemo, useState } from 'react';
import {
  canApprove,
  canDelete,
  canEdit,
  canEditPerson,
  canView,
  createDefaultPermission,
  isAdmin,
} from '../services/permissionService';
import { FamilyRole, Permission } from '../types';

export const usePermissions = (
  userId: string,
  initialRole: FamilyRole = FamilyRole.GUEST,
) => {
  const [permission, setPermission] = useState<Permission>(
    createDefaultPermission(userId, initialRole),
  );

  // Cập nhật role
  const updateRole = useCallback(
    (role: FamilyRole) => {
      setPermission(createDefaultPermission(userId, role));
    },
    [userId],
  );

  // Kiểm tra các quyền
  const hasViewPermission = useMemo(() => canView(permission), [permission]);
  const hasEditPermission = useMemo(() => canEdit(permission), [permission]);
  const hasDeletePermission = useMemo(
    () => canDelete(permission),
    [permission],
  );
  const hasApprovePermission = useMemo(
    () => canApprove(permission),
    [permission],
  );
  const isUserAdmin = useMemo(() => isAdmin(permission), [permission]);

  // Kiểm tra có thể chỉnh sửa thành viên cụ thể
  const canEditSpecificPerson = useCallback(() => {
    return canEditPerson(permission);
  }, [permission]);

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
