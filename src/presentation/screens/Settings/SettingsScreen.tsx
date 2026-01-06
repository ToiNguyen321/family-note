/**
 * Màn hình cài đặt
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PermissionBadge } from '../../components/PermissionBadge';
import { usePermissions } from '../../../hooks/usePermissions';
import { FamilyRole } from '../../../types';

export const SettingsScreen: React.FC = () => {
  const { permission, isUserAdmin } = usePermissions('user-id', FamilyRole.MEMBER);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cài Đặt</Text>
      </View>

      {/* User Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vai trò:</Text>
          <PermissionBadge role={permission.role} />
        </View>
      </View>

      {/* Permissions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quyền hạn</Text>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Xem gia phả:</Text>
          <Text style={styles.permissionValue}>
            {permission.canView ? '✓' : '✗'}
          </Text>
        </View>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Chỉnh sửa:</Text>
          <Text style={styles.permissionValue}>
            {permission.canEdit ? '✓' : '✗'}
          </Text>
        </View>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Xóa:</Text>
          <Text style={styles.permissionValue}>
            {permission.canDelete ? '✓' : '✗'}
          </Text>
        </View>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Duyệt đề xuất:</Text>
          <Text style={styles.permissionValue}>
            {permission.canApprove ? '✓' : '✗'}
          </Text>
        </View>
      </View>

      {/* Admin Settings */}
      {isUserAdmin && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản trị</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Quản lý thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Duyệt đề xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Phân quyền</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Về ứng dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionLabel: {
    fontSize: 16,
    color: '#333',
  },
  permissionValue: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '600',
  },
  settingButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
