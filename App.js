/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StyleSheet} from 'react-native';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/SignUp';
import MOriginals from './src/MOriginals';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react"
import SplashScreen from './src/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return( 
  <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Splashscreen' component={SplashScreen}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={SignUp}/>
   
        <Stack.Screen name='MOriginals' component={MOriginals}/>
      
  </Stack.Navigator>
  </NavigationContainer>
  </PersistGate>
  </Provider>
  );
};

export default App;
