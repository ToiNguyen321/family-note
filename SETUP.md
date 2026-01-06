# Hướng dẫn cài đặt và chạy ứng dụng Gia Phả Số

## 📋 Yêu cầu

- Node.js >= 20
- React Native 0.83.1
- iOS: Xcode và CocoaPods
- Android: Android Studio và JDK

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
# Cài đặt dependencies chính
npm install

# Hoặc sử dụng yarn
yarn install

# Cài đặt thêm dependencies cần thiết cho navigation
npm install @react-navigation/bottom-tabs
```

### 2. Cài đặt iOS dependencies (chỉ cho iOS)

```bash
cd ios
pod install
cd ..
```

## 🏃 Chạy ứng dụng

### iOS

```bash
npm run ios
# hoặc
yarn ios
```

### Android

```bash
npm run android
# hoặc
yarn android
```

## 📦 Dependencies cần thêm (tùy chọn)

### Icons cho Tab Navigation

```bash
npm install react-native-vector-icons
# hoặc sử dụng emoji (đã có sẵn)
```

### Date handling

```bash
npm install date-fns
```

### Lunar Calendar Conversion

Cần tích hợp thư viện hoặc API để chuyển đổi âm/dương lịch. Có thể sử dụng:
- API từ các dịch vụ online
- Thư viện JavaScript nếu có
- Tự implement thuật toán chuyển đổi

## 🔧 Cấu hình

### Navigation

Navigation đã được cấu hình với:
- **Bottom Tab Navigator**: Cho các màn hình chính (Home, FamilyTree, Calendar, Notifications, Settings)
- **Stack Navigator**: Cho các màn hình chi tiết (PersonDetail, AddPerson, EditPerson)

### Types

Tất cả types đã được định nghĩa trong `src/types/index.ts`. Import và sử dụng:

```typescript
import { Person, FamilyTree, CalendarEvent } from '../types';
```

### Services

Services được đặt trong `src/services/`:
- `calendarService.ts`: Xử lý lịch
- `notificationService.ts`: Xử lý thông báo
- `permissionService.ts`: Xử lý phân quyền
- `familyTreeService.ts`: Xử lý cây gia phả

### Hooks

Custom hooks trong `src/hooks/`:
- `useFamilyTree`: Quản lý cây gia phả
- `useCalendar`: Quản lý lịch
- `useNotifications`: Quản lý thông báo
- `usePermissions`: Quản lý phân quyền

## 📱 Cấu trúc màn hình

1. **Home**: Trang chủ với quick actions và tổng quan
2. **FamilyTree**: Hiển thị cây gia phả với khả năng zoom/pan
3. **PersonDetail**: Chi tiết thành viên
4. **Calendar**: Lịch cúng giỗ và sinh nhật
5. **Notifications**: Danh sách thông báo
6. **Settings**: Cài đặt và phân quyền

## 🐛 Troubleshooting

### Lỗi navigation

Nếu gặp lỗi về navigation, đảm bảo đã cài đặt:
```bash
npm install @react-navigation/bottom-tabs
```

### Lỗi TypeScript

Chạy type check:
```bash
npx tsc --noEmit
```

### Clear cache

Nếu gặp lỗi cache:
```bash
npm start -- --reset-cache
```

## 📝 Notes

- Hiện tại đang sử dụng mock data, cần tích hợp với backend/API
- Cần thêm màn hình AddPerson và EditPerson
- Cần tích hợp thư viện chuyển đổi âm/dương lịch
- Push notifications cần được cấu hình
