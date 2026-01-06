/**
 * Màn hình thông báo
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { NotificationCard } from '@/presentation/components/NotificationCard';
import { useFamilyTree } from '@/hooks/useFamilyTree';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotifications } from '@/hooks/useNotifications';
import { mockFamilyMembers } from '@/data/mockFamily';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NotificationsScreen: React.FC = () => {
  const { members } = useFamilyTree(mockFamilyMembers);
  const { allEvents } = useCalendar(members);
  const {
    notifications,
    unreadNotifications,
    unreadCount,
    settings,
    markAllNotificationsAsRead,
    updateSettings,
  } = useNotifications(allEvents);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông Báo</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllNotificationsAsRead}
          >
            <Text style={styles.markAllText}>Đánh dấu tất cả đã đọc</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Cài đặt thông báo</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Cúng giỗ</Text>
          <Switch
            value={settings.deathAnniversary}
            onValueChange={value => updateSettings({ deathAnniversary: value })}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sinh nhật</Text>
          <Switch
            value={settings.birthday}
            onValueChange={value => updateSettings({ birthday: value })}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sự kiện gia đình</Text>
          <Switch
            value={settings.familyEvent}
            onValueChange={value => updateSettings({ familyEvent: value })}
          />
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content}>
        {unreadCount > 0 && (
          <View style={styles.unreadSection}>
            <Text style={styles.unreadTitle}>Chưa đọc ({unreadCount})</Text>
            {unreadNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </View>
        )}

        <View style={styles.allSection}>
          <Text style={styles.allTitle}>Tất cả thông báo</Text>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Không có thông báo</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  markAllButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  markAllText: {
    fontSize: 14,
    color: '#4a90e2',
  },
  settingsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  unreadSection: {
    marginTop: 16,
  },
  unreadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  allSection: {
    marginTop: 16,
  },
  allTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
