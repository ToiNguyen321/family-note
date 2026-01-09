/**
 * Màn hình hiển thị cây gia phả theo từng thế hệ (mỗi level một hàng ngang)
 */

import { useFamilyTree } from '@/hooks/useFamilyTree';
import { usePermissions } from '@/hooks/usePermissions';
import { FamilyTreeView } from '@/presentation/components/FamilyTreeView';
import { Person } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FamilyTreeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tree, members } = useFamilyTree();
  const { hasEditPermission } = usePermissions('user-id', 'member' as any);

  const handlePersonPress = (person: Person) => {
    navigation.navigate('PersonDetail', { personId: person.id });
  };

  const handleAddMember = () => {
    if (!hasEditPermission) {
      Alert.alert('Thông báo', 'Bạn không có quyền thêm thành viên');
      return;
    }
    navigation.navigate('AddPerson' as never);
  };

  // Chọn tạm một thành viên ở giữa làm \"tôi\" để demo cách xưng hô
  const currentPersonId = React.useMemo(() => {
    if (!tree) return undefined;
    let node: any = tree;
    if (node.children && node.children[0]) {
      node = node.children[0];
    }
    if (node.children && node.children[0]) {
      node = node.children[0];
    }
    return node.person.id as string;
  }, [tree]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cây Gia Phả</Text>
        {hasEditPermission && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
            <Text style={styles.addButtonText}>+ Thêm</Text>
          </TouchableOpacity>
        )}
      </View>

      {tree ? (
        <FamilyTreeView
          tree={tree}
          onPersonPress={handlePersonPress}
          currentPersonId={currentPersonId}
          members={members}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Chưa có dữ liệu gia phả</Text>
          {hasEditPermission && (
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={handleAddMember}
            >
              <Text style={styles.emptyButtonText}>
                Thêm thành viên đầu tiên
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
