import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { Alert } from 'react-native';
// import { CommonActions, useNavigation } from '@react-navigation/native';

export const registerUser = createAsyncThunk(
  // action type string
  'user/register',
  // callback function
  async ({ name, email, phone_number, password, confirm_pass, tc }, { rejectWithValue }) => {
    try {
      console.log('start');
      console.log('name, email ', name, email, phone_number);
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // make request to backend
      const data1 = {
        name: name,
        email: email,
        password: password,
        confirm_pass: confirm_pass,
        phone_number: phone_number,
        tc: tc
      };
      console.log('data1 ', data1);
      const { data, status } = await axios.post(`${BASE_URL}/register`, data1, config);

      // console.log("token data from reg ",data, data.token, " ", data.refresh_token);
      if (status === 201) {
        // let token = data.token;
        // let refresh_token = data.refresh_token;
        AsyncStorage.setItem('userToken', JSON.stringify(data.token));
        AsyncStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
        // Keychain.setGenericPassword('userToken', JSON.stringify({token}));
        // Keychain.setGenericPassword('refresh_token', JSON.stringify({refresh_token}));
        //  console.log("token from Regis ", Keychain.getGenericPassword('userToken'))
        Alert.alert('Thankyou for registering');

        // if(data.token){
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index:0,
        //             routes:[
        //                 {name:"MOriginals"}
        //             ]
        //         })
        //     );
        // }
      } else if (data.status === 'failed_ExistUser') {
        Alert.alert(
          'Email already exists',
          'You must login or try registering with another email',
          [{ text: 'OK' }]
        );
      } else if (data.status === 'failed_Registration') {
        Alert.alert('Registration failed, please try again later');
      } else if (data.status === 'failed_!Pass') {
        Alert.alert('Password mismatch', 'Password and confirm password should be same', [
          { text: 'OK' }
        ]);
      } else if (data.status === 'failed_EmptyFields') {
        Alert.alert('Please fill all data', 'All fields are required', [{ text: 'OK' }]);
      }

      return data;
    } catch (error) {
      console.log('err ', error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log('error from catch');
        return rejectWithValue(error.response.data.message);
      } else {
        console.log('error from catch else', error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  // action type string
  'user/login',
  // callback function
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('start login');
      console.log(' email ', email);
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // make request to backend
      const data1 = {
        email: email,
        password: password
      };
      console.log('data1 ', data1);
      const { data } = await axios.post(`${BASE_URL}/login`, data1, config);

      console.log('token data from log ', data.token, ' ', data.refresh_token);
      if (data.status === 'success_login') {
        // let userToken = 'userToken';
        // let refreshToken = 'refresh_token';
        // let token = data.token;
        // let refresh_token = data.refresh_token;
        AsyncStorage.setItem('userToken', JSON.stringify(data.token));
        AsyncStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
        // Keychain.setGenericPassword('userToken', JSON.stringify({userToken, token}));
        // Keychain.setGenericPassword('refresh_token', JSON.stringify({refreshToken, refresh_token}));

        Alert.alert('You are logged In', 'You will be redirected to App', [{ text: 'OK' }]);
        //    console.log("get token to check ", Keychain.getGenericPassword());
      } else if (data.status === 'failed_EmptyFields') {
        Alert.alert('Please fill all data', 'All fields are required', [{ text: 'OK' }]);
      } else if (data.status === 'failed_!EmailPass') {
        Alert.alert('Wrong credentials', 'Please check your credentials', [{ text: 'OK' }]);
      } else if (data.status === 'failed_!RegUser') {
        Alert.alert("User doesn't exist");
      } else if (data.status === 'failed_login') {
        Alert.alert('Some error', 'Try again later', [{ text: 'OK' }]);
      }

      return data;
    } catch (error) {
      console.log('err ', error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log('error from catch');
        return rejectWithValue(error.response.data.message);
      } else {
        console.log('error from catch else', error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  // action type string
  'user/resetPass',
  // callback function
  async ({ email }, { rejectWithValue }) => {
    try {
      console.log('start reset pass');
      console.log(' email ', email);
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // make request to backend
      const data1 = {
        email: email
      };
      console.log('data1 ', data1);
      const { data } = await axios.post(`${BASE_URL}/reset-password-email`, data1, config);

      // console.log('token data from log ', data.token, ' ', data.refresh_token);
      if (data.status === 'success') {
        console.log('sucess reset pwrd');
        Alert.alert('Reset Password', 'OTP sent', [{ text: 'OK' }]);
        //    console.log("get token to check ", Keychain.getGenericPassword());
      } else if (data.status === 'failed_noUser') {
        Alert.alert('Attention', "Email doesn't exists", [{ text: 'OK' }]);
      } else if (data.status === 'failed_EmptyFields') {
        Alert.alert('Attention', 'Please enter email to reset your password', [{ text: 'OK' }]);
      }
      return data;
    } catch (error) {
      console.log('err ', error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log('error from catch');
        return rejectWithValue(error.response.data.message);
      } else {
        console.log('error from catch else', error);
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   // action type string
//   'user/forgotPass',
//   // callback function
//   async ({ password, confirm_pass }, { rejectWithValue }) => {
//     try {
//       console.log('start forgot pass');
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };
//       // make request to backend
//       const data1 = {
//         password: password,
//         confirm_pass: confirm_pass
//       };
//       console.log('data1 ', data1);
//       const { data } = await axios.post(`${BASE_URL}/reset-password/${id}/${token}`, data1, config);

//       // console.log('token data from log ', data.token, ' ', data.refresh_token);
//       if (data.status === 'success') {
//         console.log('sucess reset pwrd');
//         Alert.alert('Successful', 'Your password has been changed.', [{ text: 'OK' }]);
//         //    console.log("get token to check ", Keychain.getGenericPassword());
//       } else if (data.status === 'failed_NoPassMatch') {
//         Alert.alert('Attention', "Password doesn't match", [{ text: 'OK' }]);
//       } else if (data.status === 'failed_EmptyFields') {
//         Alert.alert('Attention', 'Please enter password', [{ text: 'OK' }]);
//       } else if (data.status === 'failed_tokenExp') {
//         Alert.alert('Attention', 'Your password reset link has been expired. Try again', [
//           { text: 'OK' }
//         ]);
//       }
//       return data;
//     } catch (error) {
//       console.log('err ', error);
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         console.log('error from catch');
//         return rejectWithValue(error.response.data.message);
//       } else {
//         console.log('error from catch else', error);
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
