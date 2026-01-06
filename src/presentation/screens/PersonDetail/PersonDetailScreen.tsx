/**
 * Màn hình chi tiết thành viên
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PermissionBadge } from '@/components/PermissionBadge';
import { useFamilyTree } from '@/hooks/useFamilyTree';
import { usePermissions } from '@/hooks/usePermissions';
import { PersonStatus } from '@/types';
import { mockFamilyMembers } from '@/data/mockFamily';

export const PersonDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params as { personId: string };

  const {
    members,
    selectedPerson,
    selectedPersonChildren,
    selectedPersonParents,
    selectedPersonSpouse,
    selectPerson,
  } = useFamilyTree(mockFamilyMembers);
  const { hasEditPermission, hasDeletePermission } = usePermissions(
    'user-id',
    'member' as any,
  );

  React.useEffect(() => {
    selectPerson(personId);
  }, [personId, selectPerson]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa có thông tin';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleEdit = () => {
    if (!hasEditPermission) {
      Alert.alert('Thông báo', 'Bạn không có quyền chỉnh sửa');
      return;
    }
    navigation.navigate('EditPerson' as never, { personId } as never);
  };

  const handleDelete = () => {
    if (!hasDeletePermission) {
      Alert.alert('Thông báo', 'Bạn không có quyền xóa');
      return;
    }
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa thành viên này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          // Handle delete
          navigation.goBack();
        },
      },
    ]);
  };

  if (!selectedPerson) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thành viên</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header với avatar */}
      <View style={styles.header}>
        {selectedPerson.avatar ? (
          <Image
            source={{ uri: selectedPerson.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {selectedPerson.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{selectedPerson.fullName}</Text>
        {selectedPerson.role && (
          <Text style={styles.role}>{selectedPerson.role}</Text>
        )}
        <View style={styles.statusContainer}>
          <Text style={styles.status}>
            {selectedPerson.status === PersonStatus.ALIVE
              ? 'Còn sống'
              : 'Đã mất'}
          </Text>
        </View>
      </View>

      {/* Thông tin cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày sinh:</Text>
          <Text style={styles.infoValue}>
            {formatDate(selectedPerson.dateOfBirth)}
            {selectedPerson.lunarBirthDate && ' (Âm lịch)'}
          </Text>
        </View>
        {selectedPerson.dateOfDeath && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày mất:</Text>
            <Text style={styles.infoValue}>
              {formatDate(selectedPerson.dateOfDeath)}
              {selectedPerson.lunarDeathDate && ' (Âm lịch)'}
            </Text>
          </View>
        )}
        {selectedPerson.hometown && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quê quán:</Text>
            <Text style={styles.infoValue}>{selectedPerson.hometown}</Text>
          </View>
        )}
        {selectedPerson.clan && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dòng họ:</Text>
            <Text style={styles.infoValue}>{selectedPerson.clan}</Text>
          </View>
        )}
      </View>

      {/* Quan hệ gia đình */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quan hệ gia đình</Text>
        {selectedPersonSpouse && (
          <TouchableOpacity
            style={styles.relationItem}
            onPress={() =>
              navigation.navigate(
                'PersonDetail' as never,
                {
                  personId: selectedPersonSpouse.id,
                } as never,
              )
            }
          >
            <Text style={styles.relationLabel}>Vợ/Chồng:</Text>
            <Text style={styles.relationValue}>
              {selectedPersonSpouse.fullName}
            </Text>
          </TouchableOpacity>
        )}
        {selectedPersonParents.length > 0 && (
          <View>
            <Text style={styles.relationLabel}>Cha mẹ:</Text>
            {selectedPersonParents.map(parent => (
              <TouchableOpacity
                key={parent.id}
                style={styles.relationItem}
                onPress={() =>
                  navigation.navigate(
                    'PersonDetail' as never,
                    {
                      personId: parent.id,
                    } as never,
                  )
                }
              >
                <Text style={styles.relationValue}>• {parent.fullName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {selectedPersonChildren.length > 0 && (
          <View>
            <Text style={styles.relationLabel}>Con cái:</Text>
            {selectedPersonChildren.map(child => (
              <TouchableOpacity
                key={child.id}
                style={styles.relationItem}
                onPress={() =>
                  navigation.navigate(
                    'PersonDetail' as never,
                    {
                      personId: child.id,
                    } as never,
                  )
                }
              >
                <Text style={styles.relationValue}>• {child.fullName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Tiểu sử */}
      {selectedPerson.biography && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiểu sử</Text>
          <Text style={styles.biography}>{selectedPerson.biography}</Text>
        </View>
      )}

      {/* Ghi chú */}
      {selectedPerson.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú</Text>
          <Text style={styles.notes}>{selectedPerson.notes}</Text>
        </View>
      )}

      {/* Thành tích */}
      {selectedPerson.achievements &&
        selectedPerson.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thành tích</Text>
            {selectedPerson.achievements.map((achievement, index) => (
              <Text key={index} style={styles.achievement}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}

      {/* Action Buttons */}
      {(hasEditPermission || hasDeletePermission) && (
        <View style={styles.actions}>
          {hasEditPermission && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          )}
          {hasDeletePermission && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  statusContainer: {
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
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
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  relationItem: {
    marginBottom: 8,
  },
  relationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  relationValue: {
    fontSize: 14,
    color: '#4a90e2',
  },
  biography: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  notes: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  achievement: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
