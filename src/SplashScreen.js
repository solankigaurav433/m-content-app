import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosPrivate } from './AxiosInstance';

const SplashScreen = ({ navigation }) => {
  const data = async () => {
    let result = await AsyncStorage.getItem('userToken');

    if (result !== null) {
      console.log('inside');
      navigation.replace('MOriginals');
    } else {
      navigation.replace('Login');
    }
  };

  const auth = async () => {
    let result = await AsyncStorage.getItem('userToken');
    axiosPrivate.interceptors.request.use(
      (config) => {
        console.log('config ', config);
        if (!config.headers.Authorization) {
          let temp = JSON.parse(result);
          console.log('temp ', result);
          config.headers.Authorization = `Bearer ${temp}`;
          console.log('config insid ', config);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    console.log('inside useEffect');
    data();
    auth();
  }, [data, auth]);

  return (
    <View style={styles.container}>
      <Text>LOADING....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default SplashScreen;
