# Kiến trúc ứng dụng Gia Phả Số

## 📁 Cấu trúc thư mục

```
src/
├── types/                    # TypeScript types và interfaces
│   └── index.ts             # Định nghĩa tất cả types
├── services/                 # Business logic và services
│   ├── calendarService.ts   # Xử lý lịch cúng giỗ và sinh nhật
│   ├── notificationService.ts # Xử lý thông báo
│   ├── permissionService.ts  # Xử lý phân quyền
│   └── familyTreeService.ts # Xử lý cây gia phả
├── hooks/                    # Custom React hooks
│   ├── useFamilyTree.ts     # Hook quản lý cây gia phả
│   ├── useCalendar.ts       # Hook quản lý lịch
│   ├── useNotifications.ts # Hook quản lý thông báo
│   └── usePermissions.ts    # Hook quản lý phân quyền
└── presentation/            # UI Layer
    ├── components/          # Reusable components
    │   ├── PersonNode/      # Component hiển thị node thành viên
    │   ├── FamilyTreeView/  # Component hiển thị cây gia phả
    │   ├── CalendarItem/    # Component hiển thị sự kiện lịch
    │   ├── NotificationCard/# Component hiển thị thông báo
    │   └── PermissionBadge/ # Component hiển thị badge phân quyền
    ├── screens/             # Màn hình chính
    │   ├── Home/            # Trang chủ
    │   ├── FamilyTree/      # Màn hình cây gia phả
    │   ├── PersonDetail/     # Chi tiết thành viên
    │   ├── Calendar/        # Lịch sự kiện
    │   ├── Notifications/   # Thông báo
    │   └── Settings/        # Cài đặt
    └── navigation/          # Navigation setup
        └── AppNavigator.tsx # Cấu hình navigation
```

## 🎯 Kiến trúc

### 1. Types Layer (`src/types/`)
Định nghĩa tất cả các types và interfaces:
- `Person`: Thông tin thành viên
- `FamilyTree`: Cấu trúc cây gia phả
- `CalendarEvent`: Sự kiện lịch
- `Notification`: Thông báo
- `Permission`: Phân quyền
- Enums: `PersonStatus`, `FamilyRole`, `Relationship`, `EventType`, `NotificationType`

### 2. Services Layer (`src/services/`)
Chứa business logic và xử lý dữ liệu:
- **calendarService**: Chuyển đổi âm/dương lịch, tạo sự kiện
- **notificationService**: Tạo và quản lý thông báo
- **permissionService**: Kiểm tra và quản lý phân quyền
- **familyTreeService**: Xây dựng và layout cây gia phả

### 3. Hooks Layer (`src/hooks/`)
Custom React hooks để quản lý state và logic:
- **useFamilyTree**: Quản lý thành viên, cây gia phả, đề xuất chỉnh sửa
- **useCalendar**: Quản lý lịch sự kiện, filter, view modes
- **useNotifications**: Quản lý thông báo, settings
- **usePermissions**: Quản lý phân quyền người dùng

### 4. Presentation Layer (`src/presentation/`)

#### Components (`components/`)
Reusable UI components:
- **PersonNode**: Hiển thị một thành viên trong cây
- **FamilyTreeView**: Hiển thị toàn bộ cây với zoom/pan
- **CalendarItem**: Hiển thị sự kiện lịch
- **NotificationCard**: Hiển thị thông báo
- **PermissionBadge**: Badge phân quyền

#### Screens (`screens/`)
Các màn hình chính:
- **HomeScreen**: Trang chủ với quick actions và tổng quan
- **FamilyTreeScreen**: Hiển thị cây gia phả
- **PersonDetailScreen**: Chi tiết thành viên
- **CalendarScreen**: Lịch cúng giỗ và sinh nhật
- **NotificationsScreen**: Danh sách thông báo
- **SettingsScreen**: Cài đặt và phân quyền

#### Navigation (`navigation/`)
- **AppNavigator**: Cấu hình navigation với Tab và Stack navigators

## 🔄 Luồng dữ liệu

1. **User Action** → Screen
2. **Screen** → Hook (useFamilyTree, useCalendar, etc.)
3. **Hook** → Service (business logic)
4. **Service** → Returns data/result
5. **Hook** → Updates state
6. **Screen** → Re-renders với data mới

## 📱 Navigation Structure

```
AppNavigator (Stack)
├── MainTabs (Bottom Tab)
│   ├── Home
│   ├── FamilyTree
│   ├── Calendar
│   ├── Notifications
│   └── Settings
└── Stack Screens
    ├── PersonDetail
    ├── AddPerson (TODO)
    └── EditPerson (TODO)
```

## 🎨 Tính năng chính

### ✅ Đã triển khai
- [x] Cấu trúc types và interfaces
- [x] Services layer (calendar, notification, permission, familyTree)
- [x] Hooks layer (useFamilyTree, useCalendar, useNotifications, usePermissions)
- [x] Components (PersonNode, FamilyTreeView, CalendarItem, NotificationCard, PermissionBadge)
- [x] Screens (Home, FamilyTree, PersonDetail, Calendar, Notifications, Settings)
- [x] Navigation structure

### 🚧 Cần hoàn thiện
- [ ] Tích hợp thư viện chuyển đổi âm/dương lịch
- [ ] Tích hợp icon library cho tab navigation
- [ ] Màn hình AddPerson và EditPerson
- [ ] Tích hợp backend/API
- [ ] Push notifications
- [ ] Local storage/persistence
- [ ] Image upload cho avatar
- [ ] Zoom/pan gestures cho FamilyTreeView
- [ ] Unit tests

## 📦 Dependencies cần thêm

```bash
# Navigation
npm install @react-navigation/bottom-tabs

# Icons (optional)
npm install react-native-vector-icons

# Date handling (optional)
npm install date-fns

# Lunar calendar conversion (cần tìm thư viện phù hợp)
# Có thể sử dụng API hoặc thư viện JavaScript
```

## 🔧 Cấu hình cần thiết

1. **Navigation**: Đã có `@react-navigation/native`, cần thêm `@react-navigation/bottom-tabs`
2. **Icons**: Có thể sử dụng emoji hoặc thư viện icon
3. **Lunar Calendar**: Cần tích hợp thư viện hoặc API chuyển đổi

## 📝 Notes

- Tất cả các services và hooks đã được thiết kế để dễ dàng tích hợp với backend
- Mock data hiện tại được sử dụng để demo, cần thay thế bằng API calls
- Components được thiết kế để tái sử dụng và dễ customize
- Navigation types đã được định nghĩa để type-safe
