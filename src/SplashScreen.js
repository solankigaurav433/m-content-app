import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const {userToken} = useSelector(state => state.user);
  useEffect(() => {
    console.log("usToken ", userToken);
    if (userToken !== null) {
      navigation.replace('MOriginals');
    } else {
      navigation.replace('Login');
    }
  }, [userToken]);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
