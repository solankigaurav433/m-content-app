import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { BASE_URL } from '@env';
import { loginUser } from '../redux/userAction';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async () => {
    const a = await dispatch(loginUser({ email, password }));
    console.log('login submit form ', dispatch(loginUser({ email, password })));
    a.payload.token ? navigation.replace('Splashscreen') : null;
  };

  return (
    <FastImage source={require('../assets/image/backgroundGif.gif')} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.maincontainer}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.signIn}>Sign in to continue</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={'#CCCCCC'}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor={'#CCCCCC'}
          />
          <TouchableOpacity style={styles.signinBtn} onPress={submitForm}>
            <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
          </TouchableOpacity>
          <View className="flex-row justify-center items-center my-2">
            <TouchableOpacity onPress={() => navigation.push('ResetPassword')}>
              <Text className="text-grey text-[12px] mt-1">Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center my-1">
            <Text className="text-grey mr-1">Don't have an account?</Text>
            <Text
              onPress={() => navigation.navigate('Register')}
              className="text-orange-500 underline decoration-orange-500 font-bold">
              Sign up now
            </Text>
          </View>
          <View className="flex-row justify-center my-1 mt-2">
            <Icon style={{ marginRight: 10 }} name="google" size={35} color="#4285F4" />
            <Icon style={{ marginLeft: 10 }} name="facebook-square" size={35} color="#4267B2" />
          </View>
        </View>
      </View>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    color: 'grey'
  },
  btn: {
    marginTop: 10
  },
  signIn: {
    marginBottom: 10,
    color: 'grey'
  },
  signinBtn: {
    backgroundColor: 'orange',
    height: 35,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Login;
