import { Notification, NotificationSettings } from '@/types';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type NotificationStateData = {
  notifications: Notification[];
  notificationSettings: NotificationSettings;
};

type NotificationStateActions = {
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (notificationId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  updateNotificationSettings: (newSettings: Partial<NotificationSettings>) => void;
};

type NotificationState = NotificationStateData & NotificationStateActions;

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  notificationSettings: {
    deathAnniversary: true,
    birthday: true,
    familyEvent: true,
    reminderDays: [1, 3, 7],
  },
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  removeNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notificationId),
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    })),
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  updateNotificationSettings: (newSettings) =>
    set((state) => ({
      notificationSettings: {
        ...state.notificationSettings,
        ...newSettings,
      },
    })),
}));

export const useNotificationSelectors = () =>
  useNotificationStore(
    useShallow((state) => ({
      notifications: state.notifications,
      settings: state.notificationSettings,
      setNotifications: state.setNotifications,
      addNotification: state.addNotification,
      removeNotification: state.removeNotification,
      markNotificationAsRead: state.markNotificationAsRead,
      markAllNotificationsAsRead: state.markAllNotificationsAsRead,
      updateSettings: state.updateNotificationSettings,
    })),
  );

export const useNotificationsSelector = () =>
  useNotificationStore(useShallow((state) => state.notifications));

export const useNotificationSettingsSelector = () =>
  useNotificationStore(useShallow((state) => state.notificationSettings));

export const useSetNotificationsSelector = () =>
  useNotificationStore(useShallow((state) => state.setNotifications));

export const useAddNotificationSelector = () =>
  useNotificationStore(useShallow((state) => state.addNotification));

export const useRemoveNotificationSelector = () =>
  useNotificationStore(useShallow((state) => state.removeNotification));

export const useMarkNotificationAsReadSelector = () =>
  useNotificationStore(useShallow((state) => state.markNotificationAsRead));

export const useMarkAllNotificationsAsReadSelector = () =>
  useNotificationStore(useShallow((state) => state.markAllNotificationsAsRead));

export const useUpdateNotificationSettingsSelector = () =>
  useNotificationStore(useShallow((state) => state.updateNotificationSettings));
