import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type CalendarStateData = {
  reminderDays: number[];
};

type CalendarStateActions = {
  setReminderDays: (days: number[]) => void;
};

type CalendarState = CalendarStateData & CalendarStateActions;

export const useCalendarStore = create<CalendarState>(set => ({
  reminderDays: [1, 3, 7],
  setReminderDays: days => set({ reminderDays: days }),
}));

export const useCalendarSelectors = () =>
  useCalendarStore(
    useShallow(state => ({
      reminderDays: state.reminderDays,
      setReminderDays: state.setReminderDays,
    })),
  );

export const useReminderDaysSelector = () =>
  useCalendarStore(useShallow(state => state.reminderDays));

export const useSetReminderDaysSelector = () =>
  useCalendarStore(useShallow(state => state.setReminderDays));
