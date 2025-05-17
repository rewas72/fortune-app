import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FalciHomeScreen from './screens/FalciHomeScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import { loadTokenAndAutoLogin } from './redux/actions/authActions';
import FalciTabs from './navigations/FalciTabs';
import MainTabs from './navigations/MainTabs';

const Stack = createNativeStackNavigator();

function MainApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('App açıldı, token kontrol ediliyor...');
    dispatch(loadTokenAndAutoLogin());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="FalciHome" component={FalciTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
