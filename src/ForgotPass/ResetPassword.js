import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/userAction';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const submitForm = async () => {
    const a = await dispatch(resetPassword({ email }));
    console.log('reset ', a);
    if (a.payload.status === 'success') {
      navigation.navigate('EnterOTP', { email });
    }
  };
  return (
    <View className="flex-1 justify-center">
      <View className="bg-white m-5 rounded-lg">
        <View className="p-2 items-center">
          <Text className="font-bold text-2xl tracking-widest text-orange-500">M-Content</Text>
        </View>
        <View className="items-center p-2">
          <Text className="text-lg tracking-widest font-bold text-grey my-4">Reset Password</Text>
          <Text className="text-sm self-start tracking-tighter font-semibold text-grey mb-2">
            You can reset password after submitting email below
          </Text>
          <TextInput
            className="border-2 border-slate-200 h-10 w-[100%] p-1 text-slate-700"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity className="my-5 bg-orange-500 p-1" onPress={submitForm}>
            <Text className="text-white font-bold p-1">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
