/**
 * Component hiển thị một sự kiện trong lịch
 */

import { formatDateVNShort, lunarSuffix } from '@/utils/date';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarEvent, EventType } from '../../../types';

interface CalendarItemProps {
  event: CalendarEvent;
  onPress?: (event: CalendarEvent) => void;
}

export const CalendarItem: React.FC<CalendarItemProps> = ({
  event,
  onPress,
}) => {
  const getEventIcon = () => {
    switch (event.type) {
      case EventType.DEATH_ANNIVERSARY:
        return '🕯️';
      case EventType.BIRTHDAY:
        return '🎂';
      case EventType.FAMILY_EVENT:
        return '👨‍👩‍👧‍👦';
      default:
        return '📅';
    }
  };

  const getEventColor = () => {
    switch (event.type) {
      case EventType.DEATH_ANNIVERSARY:
        return '#8b4513';
      case EventType.BIRTHDAY:
        return '#ff6b6b';
      case EventType.FAMILY_EVENT:
        return '#4ecdc4';
      default:
        return '#95a5a6';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: getEventColor() }]}
      onPress={() => onPress?.(event)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getEventIcon()}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>
          {formatDateVNShort(event.date)}
          {lunarSuffix(event.isLunar)}
        </Text>
        {event.description && (
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#999',
  },
});
