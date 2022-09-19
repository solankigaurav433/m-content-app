import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { axiosPrivate } from './AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { logoutR } from '../redux/userSlice';
import { logoutL } from '../redux/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  const [data, setData] = useState([]);

  const user = async () => {
    try {
      console.log('inside user');
      const resp = await axiosPrivate.get('/logged-user');
      console.log('dta ', resp.data, ' ', resp.status);
      if (resp.status === 200) {
        setData(resp.data.user);
      }
    } catch (error) {
      console.log('Err ', error);
    }
  };

  // const reguser = useSelector((state) => state.user);
  // const loguser = useSelector((state) => state.authenticated_user);

  // const removeToken = () => {
  //   AsyncStorage.clear();
  // };

  // const dispatch = useDispatch();
  // const signout = () => {
  //   console.log('dispatch signout');
  //   console.log('reg/log user ', reguser, ' ', loguser);
  //   if (reguser.userToken !== null) {
  //     console.log('logoutR');
  //     removeToken();
  //     dispatch(logoutR());
  //     navigation.replace('Login');
  //   } else if (loguser.userToken !== null) {
  //     console.log('logoutL');
  //     removeToken();
  //     dispatch(logoutL());
  //     navigation.replace('Login');
  //   } else {
  //     console.log('Else else');
  //   }
  // };

  useEffect(() => {
    user();
  }, []);

  const text = 'text-md w-[225px] font-bold py-1 decoration-slate-100 tracking-wide';

  return (
    <View className="m-5 p-5 bg-slate-50 rounded-2xl flex-row border-l-4 border-solid border-orange-500">
      <View>
        <Image
          className="w-20 h-20 rounded-full mr-2"
          source={require('../assets/image/avtar.png')}
        />
      </View>
      <View className="w-[100%]">
        <Text className={text}>Name: {data.name}</Text>
        <Text className={text}>Email: {data.email}</Text>
        <Text className={text}>Number: {data.phone_number}</Text>

        <View className="flex-row py-4">
          <TouchableOpacity className="bg-orange-400 mr-1" onPress={() => navigation.goBack()}>
            <Text className="text-white p-1 px-3">Back</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className="bg-orange-400 ml-1" onPress={signout}>
            <Text className="text-white p-1 px-3">Logout</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default Profile;
