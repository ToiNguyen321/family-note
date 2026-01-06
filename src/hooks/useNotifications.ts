/**
 * Hook quản lý thông báo
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Notification,
  NotificationType,
  CalendarEvent,
  NotificationSettings,
} from '../types';
import {
  createNotificationsFromEvents,
  createInfoUpdateNotification,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
} from '../services/notificationService';

const defaultSettings: NotificationSettings = {
  deathAnniversary: true,
  birthday: true,
  familyEvent: true,
  reminderDays: [1, 3, 7],
};

export const useNotifications = (
  events: CalendarEvent[],
  initialNotifications: Notification[] = [],
) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);

  // Tạo thông báo từ sự kiện
  // Sử dụng useRef để tránh infinite loop khi events array thay đổi reference
  const prevEventsLengthRef = React.useRef<number>(0);
  const processedEventIdsRef = React.useRef<Set<string>>(new Set());

  useEffect(() => {
    // Chỉ xử lý nếu số lượng events thay đổi hoặc có event mới
    if (events.length !== prevEventsLengthRef.current) {
      prevEventsLengthRef.current = events.length;

      const newNotifications = createNotificationsFromEvents(events);

      setNotifications(prev => {
        // Tránh trùng lặp bằng cách kiểm tra ID
        const existingIds = new Set(prev.map(n => n.id));
        const uniqueNew = newNotifications.filter(n => {
          if (existingIds.has(n.id) || processedEventIdsRef.current.has(n.id)) {
            return false;
          }
          processedEventIdsRef.current.add(n.id);
          return true;
        });

        // Chỉ update nếu có thông báo mới
        if (uniqueNew.length === 0) return prev;
        return [...prev, ...uniqueNew];
      });
    }
  }, [events.length]); // Chỉ phụ thuộc vào length, không phải toàn bộ array

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
  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => markAsRead(prev, notificationId));
  }, []);

  // Đánh dấu tất cả đã đọc
  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => markAllAsRead(prev));
  }, []);

  // Thêm thông báo mới
  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  // Xóa thông báo
  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Cập nhật settings
  const updateSettings = useCallback(
    (newSettings: Partial<NotificationSettings>) => {
      setSettings(prev => ({ ...prev, ...newSettings }));
    },
    [],
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
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
    removeNotification,
    updateSettings,
  };
};
