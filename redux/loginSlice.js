import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './userAction';
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

const loginSlice = createSlice({
  name: 'authenticated_user',
  initialState,
  reducers: {
    logoutL: () => {
      return initialState;
    }
  },
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      console.log('login.pending');
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log('login.fulfill');
      console.log('State ', state);
      console.log('payload ', payload);
      state.loading = false;
      state.success = true; // login successful
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.refresh_token = payload.refresh_token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('login.rejected');
      state.loading = false;
      state.error = payload;
    }
  }
});
export const { logoutL } = loginSlice.actions;
export default loginSlice.reducer;
