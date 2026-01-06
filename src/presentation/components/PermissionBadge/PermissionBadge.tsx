/**
 * Component hiển thị badge phân quyền
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FamilyRole } from '../../../types';

interface PermissionBadgeProps {
  role: FamilyRole;
}

export const PermissionBadge: React.FC<PermissionBadgeProps> = ({ role }) => {
  const getRoleLabel = () => {
    switch (role) {
      case FamilyRole.PATRIARCH:
        return 'Trưởng họ';
      case FamilyRole.ADMIN:
        return 'Quản trị';
      case FamilyRole.MEMBER:
        return 'Thành viên';
      case FamilyRole.GUEST:
        return 'Khách';
      default:
        return 'Khách';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case FamilyRole.PATRIARCH:
        return '#d4af37';
      case FamilyRole.ADMIN:
        return '#4a90e2';
      case FamilyRole.MEMBER:
        return '#50c878';
      case FamilyRole.GUEST:
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getRoleColor() }]}>
      <Text style={styles.text}>{getRoleLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
});
