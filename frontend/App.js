import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; // Burada gerçekten store var mı kontrol et
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FalciHomeScreen from './screens/FalciHomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Ekranlar burada */}
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FalciHome" component={FalciHomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
