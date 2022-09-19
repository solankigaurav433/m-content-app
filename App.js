/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/SignUp';
import MOriginals from './src/MOriginals';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from './src/SplashScreen';
import Profile from './src/Profile';
import ResetPassword from './src/ForgotPass/ResetPassword';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axiosPrivate, { refreshAuth, refreshAuthLogic } from './src/AxiosInstance';
import ForgotPassword from './src/ForgotPass/ForgotPassword';
import EnterOTP from './src/ForgotPass/EnterOTP';
import MyDrawer from './src/drawer/nav';

const Stack = createNativeStackNavigator();

const App = () => {
  // createAuthRefreshInterceptor(axiosPrivate, refreshAuthLogic, {pauseInstanceWhileRefreshing: true});

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splashscreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splashscreen" component={SplashScreen} />
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SignUp} />
            <Stack.Screen name="MOriginals" component={MyDrawer} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EnterOTP" component={EnterOTP} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
