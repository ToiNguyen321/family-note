/**
 * Màn hình chính - Trang chủ
 */

import { useCalendar } from '@/hooks/useCalendar';
import { useNotifications } from '@/hooks/useNotifications';
import { CalendarItem } from '@/presentation/components/CalendarItem';
import { NotificationCard } from '@/presentation/components/NotificationCard';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  // Mock data - sẽ được thay thế bằng data thực tế
  const { upcomingEvents: calendarEvents } = useCalendar();
  const { notifications, unreadCount } = useNotifications(calendarEvents);

  const upcomingEventsList = calendarEvents.slice(0, 5);
  const recentNotifications = notifications.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Gia Phả Số</Text>
          <Text style={styles.subtitle}>Kết nối các thế hệ</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('FamilyTree' as never)}
            >
              <Text style={styles.actionIcon}>🌳</Text>
              <Text style={styles.actionText}>Xem gia phả</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Calendar' as never)}
            >
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>Lịch sự kiện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Notifications' as never)}
            >
              <Text style={styles.actionIcon}>🔔</Text>
              <Text style={styles.actionText}>
                Thông báo
                {unreadCount > 0 && (
                  <Text style={styles.badge}> {unreadCount}</Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sự kiện sắp tới */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Calendar' as never)}
            >
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {upcomingEventsList.length > 0 ? (
            upcomingEventsList.map(event => (
              <CalendarItem key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Không có sự kiện sắp tới</Text>
            </View>
          )}
        </View>

        {/* Thông báo gần đây */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông báo</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications' as never)}
            >
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {recentNotifications.length > 0 ? (
            recentNotifications.map(notification => (
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#4a90e2',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  badge: {
    color: '#ff6b6b',
    fontWeight: 'bold',
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
