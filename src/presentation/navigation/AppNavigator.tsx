/**
 * Navigation chính của ứng dụng
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import { FamilyTreeScreen } from '../screens/FamilyTree';
import { PersonDetailScreen } from '../screens/PersonDetail';
import { CalendarScreen } from '../screens/Calendar';
import { NotificationsScreen } from '../screens/Notifications';
import { SettingsScreen } from '../screens/Settings';

export type RootStackParamList = {
  MainTabs: undefined;
  PersonDetail: { personId: string };
  AddPerson: undefined;
  EditPerson: { personId: string };
};

export type MainTabParamList = {
  Home: undefined;
  FamilyTree: undefined;
  Calendar: undefined;
  Notifications: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4a90e2',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          // tabBarIcon sẽ được thêm sau khi cài đặt icon library
        }}
      />
      <Tab.Screen
        name="FamilyTree"
        component={FamilyTreeScreen}
        options={{
          tabBarLabel: 'Gia phả',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Lịch',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Thông báo',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài đặt',
        }}
      />
    </Tab.Navigator>
  );
};

// Helper component cho tab icons
const TabIcon: React.FC<{ icon: string; color: string }> = ({ icon }) => {
  // Note: Trong React Native, bạn nên sử dụng icon library như react-native-vector-icons
  // Hoặc sử dụng emoji trực tiếp trong Text component
  return null; // Placeholder - cần thay thế bằng icon library
};

// Root Stack Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonDetail"
          component={PersonDetailScreen}
          options={{ title: 'Chi tiết thành viên' }}
        />
        {/* AddPerson và EditPerson screens sẽ được thêm sau */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
