/**
 * Navigation chính của ứng dụng
 */

import { mockFamilyMembers } from '@/data/mockFamily';
import { useFamilyStore } from '@/store/familyStore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { CalendarScreen } from '../screens/Calendar';
import { FamilyTreeScreen } from '../screens/FamilyTree';
import { HomeScreen } from '../screens/Home';
import { NotificationsScreen } from '../screens/Notifications';
import { PersonDetailScreen } from '../screens/PersonDetail';
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

// Root Stack Navigator
export const AppNavigator = () => {
  const setMembers = useFamilyStore(s => s.setMembers);
  useEffect(() => {
    setMembers(mockFamilyMembers);
  }, [setMembers]);
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
