/**
 * Hook quản lý lịch cúng giỗ và sinh nhật
 */

import { useState, useCallback, useMemo } from 'react';
import { CalendarEvent, Person, EventType } from '../types';
import {
  getAllEvents,
  getUpcomingEvents,
  createDeathAnniversaryEvents,
  createBirthdayEvents,
} from '../services/calendarService';

export const useCalendar = (
  members: Person[],
  reminderDays: number[] = [1, 3, 7]
) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  // Tất cả sự kiện
  const allEvents = useMemo(() => {
    return getAllEvents(members, reminderDays);
  }, [members, reminderDays]);

  // Sự kiện sắp tới (30 ngày)
  const upcomingEvents = useMemo(() => {
    return getUpcomingEvents(allEvents, 30);
  }, [allEvents]);

  // Sự kiện theo ngày được chọn
  const eventsOnSelectedDate = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return allEvents.filter((event) => {
      const eventDateStr = event.date.split('T')[0];
      return eventDateStr === selectedDateStr;
    });
  }, [allEvents, selectedDate]);

  // Sự kiện đã lọc theo loại
  const filteredEvents = useMemo(() => {
    if (filterType === 'all') return allEvents;
    return allEvents.filter((event) => event.type === filterType);
  }, [allEvents, filterType]);

  // Sự kiện trong tháng được chọn
  const eventsInMonth = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    return allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month
      );
    });
  }, [allEvents, selectedDate]);

  // Thay đổi ngày được chọn
  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Thay đổi chế độ xem
  const changeViewMode = useCallback((mode: 'month' | 'week' | 'day') => {
    setViewMode(mode);
  }, []);

  // Thay đổi bộ lọc
  const changeFilter = useCallback((type: EventType | 'all') => {
    setFilterType(type);
  }, []);

  // Lấy sự kiện cúng giỗ sắp tới
  const upcomingDeathAnniversaries = useMemo(() => {
    return upcomingEvents.filter(
      (event) => event.type === EventType.DEATH_ANNIVERSARY
    );
  }, [upcomingEvents]);

  // Lấy sự kiện sinh nhật sắp tới
  const upcomingBirthdays = useMemo(() => {
    return upcomingEvents.filter((event) => event.type === EventType.BIRTHDAY);
  }, [upcomingEvents]);

  return {
    allEvents,
    upcomingEvents,
    eventsOnSelectedDate,
    filteredEvents,
    eventsInMonth,
    upcomingDeathAnniversaries,
    upcomingBirthdays,
    selectedDate,
    viewMode,
    filterType,
    selectDate,
    changeViewMode,
    changeFilter,
  };
};
