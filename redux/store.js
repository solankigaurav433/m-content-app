import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loginReducer from './loginSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
};
const rootReducer = combineReducers({
  user: userReducer,
  authenticated_user: loginReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
