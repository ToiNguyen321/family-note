/**
 * Service xử lý lịch cúng giỗ và sinh nhật
 */

import { CalendarEvent, EventType, Person } from '../types';

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const toISODate = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();

const nextAnnualOccurrence = (dateStr: string): string => {
  const base = new Date(dateStr);
  const today = startOfDay(new Date());
  const thisYear = new Date(
    today.getFullYear(),
    base.getMonth(),
    base.getDate(),
  );
  const target =
    thisYear >= today
      ? thisYear
      : new Date(today.getFullYear() + 1, base.getMonth(), base.getDate());
  return toISODate(target);
};

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
  reminderDays: number[] = [1, 3, 7],
): CalendarEvent[] => {
  if (!person.dateOfDeath) return [];

  const events: CalendarEvent[] = [];
  const deathDate = person.lunarDeathDate || person.dateOfDeath;
  const isLunar = !!person.lunarDeathDate;

  const solarBase = isLunar ? convertToSolar(deathDate) : deathDate;
  const nextDate = nextAnnualOccurrence(solarBase);

  events.push({
    id: `death-anniversary-${person.id}`,
    personId: person.id,
    personName: person.fullName,
    type: EventType.DEATH_ANNIVERSARY,
    date: nextDate,
    lunarDate: isLunar ? deathDate : convertToLunar(nextDate),
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
  reminderDays: number[] = [1, 3, 7],
): CalendarEvent[] => {
  if (!person.dateOfBirth || person.status === 'deceased') return [];

  const events: CalendarEvent[] = [];
  const birthDate = person.lunarBirthDate || person.dateOfBirth;
  const isLunar = !!person.lunarBirthDate;

  const solarBase = isLunar ? convertToSolar(birthDate) : birthDate;
  const nextDate = nextAnnualOccurrence(solarBase);

  events.push({
    id: `birthday-${person.id}`,
    personId: person.id,
    personName: person.fullName,
    type: EventType.BIRTHDAY,
    date: nextDate,
    lunarDate: isLunar ? birthDate : convertToLunar(nextDate),
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
  reminderDays: number[] = [1, 3, 7],
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  members.forEach(member => {
    // Thêm sự kiện cúng giỗ
    events.push(...createDeathAnniversaryEvents(member, reminderDays));

    // Thêm sự kiện sinh nhật
    events.push(...createBirthdayEvents(member, reminderDays));
  });

  return events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

/**
 * Lấy sự kiện sắp tới (trong khoảng thời gian)
 */
export const getUpcomingEvents = (
  events: CalendarEvent[],
  daysAhead: number = 30,
): CalendarEvent[] => {
  const today = startOfDay(new Date());
  const futureDate = startOfDay(new Date(today));
  futureDate.setDate(futureDate.getDate() + daysAhead);

  return events.filter(event => {
    const eventDate = startOfDay(new Date(event.date));
    return eventDate >= today && eventDate <= futureDate;
  });
};

/**
 * Kiểm tra sự kiện có cần nhắc nhở không
 */
export const shouldRemind = (
  event: CalendarEvent,
  reminderDay: number,
): boolean => {
  const today = new Date();
  const eventDate = new Date(event.date);
  const diffDays = Math.floor(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return diffDays === reminderDay && event.reminderDays.includes(reminderDay);
};
