// navigations/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import BalanceScreen from '../screens/BalanceScreen';
import Fortune from '../screens/Fortune';

const Tab = createBottomTabNavigator();

const colors = {
    siyah: "#121212",
    beyaz: "#FFFFFF",
    sari: "#E2F163",
    mor: "#896CFE",
    acikmor: "#B3A0FF",
    gri: "#CCCCCC",
};

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveBackgroundColor: colors.mor,
                tabBarInactiveBackgroundColor: colors.acikmor,
                tabBarActiveTintColor: colors.beyaz,
                tabBarInactiveTintColor:colors.beyaz,
                tabBarStyle: { backgroundColor: '#121212' },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }
                    else if (route.name === "Balance") {
                        iconName = 'cash';
                    }
                    else if (route.name === "Fortune") {
                        iconName = 'chatbox'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Balance" component={BalanceScreen} />
            <Tab.Screen name="Fortune" component={Fortune} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}


/*
tabBarIcon: ({ color, size }) => {
                    let iconName = route.name === 'Home' ? 'home' : 'person';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
*/