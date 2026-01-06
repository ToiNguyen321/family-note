/**
 * Service xử lý lịch cúng giỗ và sinh nhật
 */

import { Person, CalendarEvent, EventType } from '../types';

/**
 * Chuyển đổi ngày dương lịch sang âm lịch
 * Note: Cần tích hợp thư viện chuyển đổi lịch âm dương thực tế
 */
export const convertToLunar = (solarDate: string): string => {
  // TODO: Tích hợp thư viện chuyển đổi lịch âm dương
  // Ví dụ: sử dụng thư viện như 'lunar-javascript' hoặc API
  return solarDate; // Placeholder
};

/**
 * Chuyển đổi ngày âm lịch sang dương lịch
 */
export const convertToSolar = (lunarDate: string): string => {
  // TODO: Tích hợp thư viện chuyển đổi lịch âm dương
  return lunarDate; // Placeholder
};

/**
 * Tạo sự kiện cúng giỗ từ ngày mất
 */
export const createDeathAnniversaryEvents = (
  person: Person,
  reminderDays: number[] = [1, 3, 7]
): CalendarEvent[] => {
  if (!person.dateOfDeath) return [];

  const events: CalendarEvent[] = [];
  const deathDate = person.lunarDeathDate || person.dateOfDeath;
  const isLunar = !!person.lunarDeathDate;

  // Tạo sự kiện chính (ngày cúng giỗ)
  events.push({
    id: `death-anniversary-${person.id}`,
    personId: person.id,
    personName: person.fullName,
    type: EventType.DEATH_ANNIVERSARY,
    date: isLunar ? convertToSolar(deathDate) : deathDate,
    lunarDate: isLunar ? deathDate : convertToLunar(deathDate),
    title: `Giỗ ${person.fullName}`,
    description: `Ngày giỗ của ${person.fullName}`,
    reminderDays,
    isLunar,
  });

  return events;
};

/**
 * Tạo sự kiện sinh nhật
 */
export const createBirthdayEvents = (
  person: Person,
  reminderDays: number[] = [1, 3, 7]
): CalendarEvent[] => {
  if (!person.dateOfBirth || person.status === 'deceased') return [];

  const events: CalendarEvent[] = [];
  const birthDate = person.lunarBirthDate || person.dateOfBirth;
  const isLunar = !!person.lunarBirthDate;

  // Tạo sự kiện chính (ngày sinh nhật)
  events.push({
    id: `birthday-${person.id}`,
    personId: person.id,
    personName: person.fullName,
    type: EventType.BIRTHDAY,
    date: isLunar ? convertToSolar(birthDate) : birthDate,
    lunarDate: isLunar ? birthDate : convertToLunar(birthDate),
    title: `Sinh nhật ${person.fullName}`,
    description: `Sinh nhật của ${person.fullName}`,
    reminderDays,
    isLunar,
  });

  return events;
};

/**
 * Lấy tất cả sự kiện từ danh sách thành viên
 */
export const getAllEvents = (
  members: Person[],
  reminderDays: number[] = [1, 3, 7]
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  members.forEach((member) => {
    // Thêm sự kiện cúng giỗ
    events.push(...createDeathAnniversaryEvents(member, reminderDays));

    // Thêm sự kiện sinh nhật
    events.push(...createBirthdayEvents(member, reminderDays));
  });

  return events.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

/**
 * Lấy sự kiện sắp tới (trong khoảng thời gian)
 */
export const getUpcomingEvents = (
  events: CalendarEvent[],
  daysAhead: number = 30
): CalendarEvent[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= futureDate;
  });
};

/**
 * Kiểm tra sự kiện có cần nhắc nhở không
 */
export const shouldRemind = (
  event: CalendarEvent,
  reminderDay: number
): boolean => {
  const today = new Date();
  const eventDate = new Date(event.date);
  const diffDays = Math.floor(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays === reminderDay && event.reminderDays.includes(reminderDay);
};
