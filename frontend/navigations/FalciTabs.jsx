import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FalciHomeScreen from '../fortuneTellerScreen/FalciHomeScreen';

const Tab = createBottomTabNavigator();

export default function FalciTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#896CFE',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'FalciHome' ? 'eye' : 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="FalciHome" component={FalciHomeScreen} />
    </Tab.Navigator>
  );
}
