/**
 * Màn hình lịch cúng giỗ và sinh nhật
 */

import { useCalendar } from '@/hooks/useCalendar';
import { CalendarItem } from '@/presentation/components/CalendarItem';
import { EventType } from '@/types';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
export const CalendarScreen: React.FC = () => {
  const { allEvents, upcomingEvents, changeFilter } = useCalendar();

  const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>(
    'all',
  );

  const handleFilterChange = (type: EventType | 'all') => {
    setSelectedFilter(type);
    changeFilter(type);
  };

  const filteredEvents =
    selectedFilter === 'all'
      ? allEvents
      : allEvents.filter(e => e.type === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch Sự Kiện</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            selectedFilter === 'all' && styles.filterTabActive,
          ]}
          onPress={() => handleFilterChange('all')}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === 'all' && styles.filterTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            selectedFilter === EventType.DEATH_ANNIVERSARY &&
              styles.filterTabActive,
          ]}
          onPress={() => handleFilterChange(EventType.DEATH_ANNIVERSARY)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === EventType.DEATH_ANNIVERSARY &&
                styles.filterTextActive,
            ]}
          >
            Cúng giỗ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            selectedFilter === EventType.BIRTHDAY && styles.filterTabActive,
          ]}
          onPress={() => handleFilterChange(EventType.BIRTHDAY)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === EventType.BIRTHDAY && styles.filterTextActive,
            ]}
          >
            Sinh nhật
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Sự kiện sắp tới */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <CalendarItem key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Không có sự kiện sắp tới</Text>
            </View>
          )}
        </View>

        {/* Tất cả sự kiện */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tất cả sự kiện</Text>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <CalendarItem key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Không có sự kiện</Text>
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#4a90e2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
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
