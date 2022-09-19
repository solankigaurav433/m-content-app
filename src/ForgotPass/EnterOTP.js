import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';

const EnterOTP = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');

  //   useEffect(() => {
  //     ToastAndroid.showWithGravity('Page will expire in 1m', ToastAndroid.LONG, ToastAndroid.TOP);
  //     setTimeout(() => {
  //       Alert.alert('Timeout! Password expired!');
  //       navigation.replace('ResetPassword');
  //     }, 60000);
  //   }, []);

  const submitOTP = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const data1 = {
        OTP: otp
      };
      const { data } = await axios.post(`${BASE_URL}/checkOTP/${email}`, data1, config);
      console.log('data ', data);
      if (data.status === 'success') {
        console.log('sucess enter otp');
        Alert.alert('OTP verified');
        navigation.replace('ForgotPassword', { email });
      } else if (data.status === 'failed_WrongOTP') {
        Alert.alert('Invalid OTP');
      } else if (data.status === 'failed_noUser') {
        Alert.alert('No user found');
      } else if (data.status === 'failed_EmptyField') {
        Alert.alert(data.message);
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <View className="bg-white m-5 rounded-lg">
        <View className="p-2 items-center">
          <Text className="font-bold text-2xl tracking-widest text-orange-500">M-Content</Text>
        </View>
        <View className="items-center p-1">
          <Text className="text-lg tracking-widest font-bold text-grey my-4">Enter OTP</Text>
          <Text className="text-sm tracking-tighter font-semibold text-grey mb-2">
            Enter the OTP sent on your email
          </Text>
          <TextInput
            className="border-b-2 p-1 text-slate-700"
            keyboardType="numeric"
            placeholder="Enter OTP"
            secureTextEntry
            maxLength={4}
            onChangeText={(text) => setOtp(text)}
          />
          <TouchableOpacity className="my-5 bg-orange-500 p-1" onPress={submitOTP}>
            <Text className="text-white font-bold p-1">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EnterOTP;
