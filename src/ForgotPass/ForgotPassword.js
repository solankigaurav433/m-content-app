import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/userAction';
import axios from 'axios';
import { BASE_URL } from '@env';

const ForgotPassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirm_pass, setConfirmPass] = useState('');
  //   const dispatch = useDispatch();

  const submitForm = async () => {
    try {
      console.log('start forgot pass');
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // make request to backend
      const data1 = {
        password: password,
        confirm_pass: confirm_pass
      };
      console.log('data1 ', data1);
      const { data } = await axios.post(`${BASE_URL}/reset-password/${email}`, data1, config);
      // console.log('token data from log ', data.token, ' ', data.refresh_token);
      if (data.status === 'success') {
        console.log('sucess reset pwrd');
        Alert.alert('Successful', 'Your password has been changed.', [{ text: 'OK' }]);
        navigation.replace('Login');
        //    console.log("get token to check ", Keychain.getGenericPassword());
      } else if (data.status === 'failed_NoPassMatch') {
        Alert.alert('Attention', "Password doesn't match", [{ text: 'OK' }]);
      } else if (data.status === 'failed_EmptyFields') {
        Alert.alert('Attention', 'Please enter password', [{ text: 'OK' }]);
      } else if (data.status === 'failed_tokenExp') {
        Alert.alert('Attention', 'Your password reset link has been expired. Try again', [
          { text: 'OK' }
        ]);
      }
      return data;
    } catch (error) {
      console.log('err ', error);
      // return custom error message from API if any
    }
  };
  return (
    <View className="flex-1 justify-center">
      <View className="bg-white m-5 rounded-lg">
        <View className="p-2 items-center">
          <Text className="font-bold text-2xl tracking-widest text-orange-500">M-Content</Text>
        </View>
        <View className="items-center p-2">
          <Text className="text-lg tracking-widest font-bold text-grey my-4">Forgot Password</Text>
          <Text className="text-sm self-start tracking-tighter font-semibold text-grey mb-2">
            Please create a new password that you don't use on any other site.
          </Text>
          <TextInput
            className="mt-2 border-2 border-slate-200 h-10 w-[100%] p-1 text-slate-700"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            className="mt-2 border-2 border-slate-200 h-10 w-[100%] p-1 text-slate-700"
            secureTextEntry
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPass(text)}
          />
          <TouchableOpacity className="my-5 bg-orange-500 p-1" onPress={submitForm}>
            <Text className="text-white font-bold p-1">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
