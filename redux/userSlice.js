import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

// const userToken = Keychain.getGenericPassword('userToken')
//   ? Keychain.getGenericPassword('userToken')
//   : null

//   const refresh_token = Keychain.getGenericPassword('refresh_token')
//   ? Keychain.getGenericPassword('refresh_token')
//   : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  refresh_token: null,
  error: null,
  success: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutR: () => {
      return initialState;
    }
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      console.log('reg.pending');
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log('reg.fulfill');
      console.log('State ', state);
      console.log('payload ', payload);
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.refresh_token = payload.refresh_token;
    },
    [registerUser.rejected]: (state, { payload }) => {
      console.log('reg.rejected');
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { logoutR } = userSlice.actions;
export default userSlice.reducer;
