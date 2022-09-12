import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
	user: userReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
   
    serializableCheck: false
  })
})

export const persistor = persistStore(store)