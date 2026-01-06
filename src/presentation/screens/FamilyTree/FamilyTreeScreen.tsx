/**
 * Màn hình hiển thị cây gia phả theo từng thế hệ (mỗi level một hàng ngang)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFamilyTree } from '@/hooks/useFamilyTree';
import { usePermissions } from '@/hooks/usePermissions';
import { FamilyTreeNode, Person, PersonStatus } from '@/types';
import { mockFamilyMembers } from '@/data/mockFamily';
import { FamilyTreeView } from '@/presentation/components/FamilyTreeView';

// Chuyển cây FamilyTreeNode thành danh sách levels (mỗi level là một mảng node)
const buildLevels = (root: FamilyTreeNode): FamilyTreeNode[][] => {
  const levels: FamilyTreeNode[][] = [];
  const queue: Array<{ node: FamilyTreeNode; level: number }> = [
    { node: root, level: 0 },
  ];

  while (queue.length > 0) {
    const { node, level } = queue.shift() as {
      node: FamilyTreeNode;
      level: number;
    };

    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(node);

    node.children.forEach(child => {
      queue.push({ node: child, level: level + 1 });
    });
  }

  return levels;
};

const formatYears = (person: Person) => {
  const birthYear = person.dateOfBirth
    ? new Date(person.dateOfBirth).getFullYear()
    : '...';
  const deathYear = person.dateOfDeath
    ? new Date(person.dateOfDeath).getFullYear()
    : person.status === PersonStatus.DECEASED
    ? '...'
    : 'nay';
  return `${birthYear} - ${deathYear}`;
};

export const FamilyTreeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { tree, members } = useFamilyTree(mockFamilyMembers);
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
  treeContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  levelRow: {
    marginBottom: 24,
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
    marginLeft: 8,
    marginBottom: 8,
  },
  levelNodes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 130,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 4,
  },
  cardAvatarContainer: {
    marginBottom: 6,
  },
  cardAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
  },
  cardAvatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  cardYears: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
  },
  cardRole: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
});
