/**
 * Service xử lý thông báo
 */

import {
  CalendarEvent,
  Notification,
  NotificationType,
  Person,
} from '../types';
import { shouldRemind } from './calendarService';

/**
 * Tạo thông báo từ sự kiện lịch
 */
export const createNotificationFromEvent = (
  event: CalendarEvent,
  reminderDay: number,
): Notification => {
  let title = '';
  let message = '';

  switch (event.type) {
    case 'death_anniversary':
      title = 'Nhắc nhở: Cúng giỗ';
      message = `Còn ${reminderDay} ngày nữa là ngày giỗ của ${event.personName}`;
      break;
    case 'birthday':
      title = 'Nhắc nhở: Sinh nhật';
      message = `Còn ${reminderDay} ngày nữa là sinh nhật của ${event.personName}`;
      break;
    case 'family_event':
      title = 'Sự kiện gia đình';
      message = event.description || event.title;
      break;
  }

  return {
    id: `notification-${event.id}-${reminderDay}`,
    type: event.type as unknown as any,
    title,
    message,
    personId: event.personId,
    eventId: event.id,
    read: false,
    createdAt: new Date().toISOString(),
    scheduledFor: new Date(
      new Date(event.date).getTime() - reminderDay * 24 * 60 * 60 * 1000,
    ).toISOString(),
  };
};

/**
 * Tạo thông báo từ danh sách sự kiện
 */
export const createNotificationsFromEvents = (
  events: CalendarEvent[],
): Notification[] => {
  const notifications: Notification[] = [];

  events.forEach(event => {
    event.reminderDays.forEach(reminderDay => {
      if (shouldRemind(event, reminderDay)) {
        notifications.push(createNotificationFromEvent(event, reminderDay));
      }
    });
  });

  return notifications;
};

/**
 * Tạo thông báo cập nhật thông tin
 */
export const createInfoUpdateNotification = (person: Person): Notification => {
  return {
    id: `info-update-${person.id}-${Date.now()}`,
    type: NotificationType.INFO_UPDATE,
    title: 'Cập nhật thông tin',
    message: `Thông tin của ${person.fullName} đã được cập nhật`,
    personId: person.id,
    read: false,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Lọc thông báo chưa đọc
 */
export const getUnreadNotifications = (
  notifications: Notification[],
): Notification[] => {
  return notifications.filter(n => !n.read);
};

/**
 * Đánh dấu thông báo đã đọc
 */
export const markAsRead = (
  notifications: Notification[],
  notificationId: string,
): Notification[] => {
  return notifications.map(n =>
    n.id === notificationId ? { ...n, read: true } : n,
  );
};

/**
 * Đánh dấu tất cả thông báo đã đọc
 */
export const markAllAsRead = (
  notifications: Notification[],
): Notification[] => {
  return notifications.map(n => ({ ...n, read: true }));
};
