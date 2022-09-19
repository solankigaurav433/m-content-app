import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import MOriginals from '../MOriginals';
import Profile from '../Profile';
import { useDispatch, useSelector } from 'react-redux';
import { logoutR } from '../../redux/userSlice';
import { logoutL } from '../../redux/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  const reguser = useSelector((state) => state.user);
  const loguser = useSelector((state) => state.authenticated_user);

  const removeToken = () => {
    AsyncStorage.clear();
  };

  const dispatch = useDispatch();
  const signout = () => {
    console.log('dispatch signout');
    console.log('reg/log user ', reguser, ' ', loguser);
    if (reguser.userToken !== null) {
      console.log('logoutR');
      removeToken();
      dispatch(logoutR());
      props.navigation.replace('Login');
    } else if (loguser.userToken !== null) {
      console.log('logoutL');
      removeToken();
      dispatch(logoutL());
      props.navigation.replace('Login');
    } else {
      console.log('Else else');
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={signout} />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={MOriginals} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
