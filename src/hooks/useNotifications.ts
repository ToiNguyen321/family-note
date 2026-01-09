/**
 * Hook quản lý thông báo
 */

import { useNotificationSelectors } from '@/store/notificationStore';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  createNotificationsFromEvents,
  getUnreadNotifications,
} from '../services/notificationService';
import { CalendarEvent, NotificationType } from '../types';

export const useNotifications = (events: CalendarEvent[]) => {
  const {
    notifications,
    settings,
    setNotifications,
    addNotification,
    removeNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    updateSettings,
  } = useNotificationSelectors();

  // Tạo thông báo từ sự kiện
  // Sử dụng useRef để tránh infinite loop khi events array thay đổi reference
  const prevEventsLengthRef = React.useRef<number>(0);
  const processedEventIdsRef = React.useRef<Set<string>>(new Set());

  useEffect(() => {
    if (events.length !== prevEventsLengthRef.current) {
      prevEventsLengthRef.current = events.length;
      const newNotifications = createNotificationsFromEvents(events);
      const existingIds = new Set(notifications.map(n => n.id));
      const uniqueNew = newNotifications.filter(n => {
        if (existingIds.has(n.id) || processedEventIdsRef.current.has(n.id)) {
          return false;
        }
        processedEventIdsRef.current.add(n.id);
        return true;
      });
      if (uniqueNew.length > 0) {
        setNotifications([...uniqueNew, ...notifications]);
      }
    }
  }, [events.length, notifications, setNotifications]);

  // Thông báo chưa đọc
  const unreadNotifications = useMemo(() => {
    return getUnreadNotifications(notifications);
  }, [notifications]);

  // Thông báo đã lọc theo loại và settings
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      switch (notification.type) {
        case NotificationType.DEATH_ANNIVERSARY:
          return settings.deathAnniversary;
        case NotificationType.BIRTHDAY:
          return settings.birthday;
        case NotificationType.FAMILY_EVENT:
          return settings.familyEvent;
        default:
          return true;
      }
    });
  }, [notifications, settings]);

  // Đánh dấu đã đọc
  const markNotificationAsReadCb = useCallback(
    (notificationId: string) => {
      markNotificationAsRead(notificationId);
    },
    [markNotificationAsRead],
  );

  const markAllNotificationsAsReadCb = useCallback(() => {
    markAllNotificationsAsRead();
  }, [markAllNotificationsAsRead]);

  const addNotificationCb = useCallback(
    (notification: import('../types').Notification) => {
      addNotification(notification);
    },
    [addNotification],
  );

  const removeNotificationCb = useCallback(
    (notificationId: string) => {
      removeNotification(notificationId);
    },
    [removeNotification],
  );

  const updateSettingsCb = useCallback(
    (newSettings: Partial<typeof settings>) => {
      updateSettings(newSettings);
    },
    [updateSettings],
  );

  // Số lượng thông báo chưa đọc
  const unreadCount = useMemo(() => {
    return unreadNotifications.length;
  }, [unreadNotifications]);

  return {
    notifications: filteredNotifications,
    unreadNotifications,
    unreadCount,
    settings,
    markNotificationAsRead: markNotificationAsReadCb,
    markAllNotificationsAsRead: markAllNotificationsAsReadCb,
    addNotification: addNotificationCb,
    removeNotification: removeNotificationCb,
    updateSettings: updateSettingsCb,
  };
};
