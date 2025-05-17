// navigations/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#896CFE',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: { backgroundColor: '#121212' },
                tabBarIcon: ({ color, size }) => {
                    let iconName = route.name === 'Home' ? 'home' : 'person';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    );
}
