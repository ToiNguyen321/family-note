/**
 * Types và Interfaces cho ứng dụng Gia Phả Số
 */

// Trạng thái thành viên
export enum PersonStatus {
  ALIVE = 'alive',
  DECEASED = 'deceased',
}

// Vai trò trong gia đình
export enum FamilyRole {
  PATRIARCH = 'patriarch', // Trưởng họ
  ADMIN = 'admin', // Quản trị
  MEMBER = 'member', // Thành viên
  GUEST = 'guest', // Khách
}

// Quan hệ gia đình
export enum Relationship {
  FATHER = 'father',
  MOTHER = 'mother',
  SON = 'son',
  DAUGHTER = 'daughter',
  HUSBAND = 'husband',
  WIFE = 'wife',
  BROTHER = 'brother',
  SISTER = 'sister',
  GRANDFATHER = 'grandfather',
  GRANDMOTHER = 'grandmother',
  GRANDSON = 'grandson',
  GRANDDAUGHTER = 'granddaughter',
}

// Loại sự kiện
export enum EventType {
  DEATH_ANNIVERSARY = 'death_anniversary', // Cúng giỗ
  BIRTHDAY = 'birthday', // Sinh nhật
  FAMILY_EVENT = 'family_event', // Sự kiện gia đình
}

// Loại thông báo
export enum NotificationType {
  DEATH_ANNIVERSARY = 'death_anniversary',
  BIRTHDAY = 'birthday',
  FAMILY_EVENT = 'family_event',
  INFO_UPDATE = 'info_update', // Cập nhật thông tin
}

// Cấu hình thông báo
export interface NotificationSettings {
  deathAnniversary: boolean;
  birthday: boolean;
  familyEvent: boolean;
  reminderDays: number[]; // [1, 3, 7] ngày
}

// Thông tin thành viên
export interface Person {
  id: string;
  fullName: string;
  avatar?: string;
  dateOfBirth?: string; // ISO date string
  dateOfDeath?: string; // ISO date string
  lunarBirthDate?: string; // Ngày sinh âm lịch
  lunarDeathDate?: string; // Ngày mất âm lịch
  hometown?: string;
  clan?: string; // Dòng họ
  role?: string; // Vai trò trong gia đình
  status: PersonStatus;
  biography?: string;
  notes?: string;
  achievements?: string[];
  spouseId?: string; // ID vợ/chồng
  parentIds: string[]; // ID cha mẹ
  childrenIds: string[]; // ID con cái
  relationship?: Relationship;
  createdAt: string;
  updatedAt: string;
}

// Node trong cây gia phả (cho layout)
export interface FamilyTreeNode {
  person: Person;
  x: number;
  y: number;
  width: number;
  height: number;
  children: FamilyTreeNode[];
  level: number; // Thế hệ
}

// Sự kiện lịch
export interface CalendarEvent {
  id: string;
  personId: string;
  personName: string;
  type: EventType;
  date: string; // ISO date string
  lunarDate?: string;
  title: string;
  description?: string;
  reminderDays: number[];
  isLunar: boolean; // Sử dụng âm lịch
}

// Thông báo
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  personId?: string;
  eventId?: string;
  read: boolean;
  createdAt: string;
  scheduledFor?: string; // Thời gian hiển thị
}

// Phân quyền
export interface Permission {
  userId: string;
  role: FamilyRole;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  branchId?: string; // Nhánh gia đình
}

// Dữ liệu gia phả
export interface FamilyTree {
  id: string;
  name: string;
  rootPersonId: string;
  members: Person[];
  createdAt: string;
  updatedAt: string;
}

// Đề xuất chỉnh sửa
export interface EditProposal {
  id: string;
  personId: string;
  proposedBy: string;
  changes: Partial<Person>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}
