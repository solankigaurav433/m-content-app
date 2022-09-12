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
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {BASE_URL} from '@env';
import { loginUser } from '../redux/userAction';


const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
 
  const submitForm = async() =>{
   const a = await dispatch(loginUser({email, password}));
   a.payload.token ? navigation.replace('MOriginals'): null;
  }
  
  return (
    <FastImage source={require("../assets/image/backgroundGif.gif")} style={{flex:1}}>
    <View style={{flex:1, justifyContent:"flex-end"}}>
    <View style={styles.maincontainer}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.signIn}>Sign in to continue</Text>
      <TextInput style={styles.input} keyboardType='email-address' onChangeText={(text)=> setEmail(text)} placeholder="Email" placeholderTextColor={'#CCCCCC'}/>
      <TextInput style={styles.input} secureTextEntry onChangeText={(text)=> setPassword(text)} placeholder="Password" placeholderTextColor={'#CCCCCC'}/>
      <TouchableOpacity style={styles.signinBtn} onPress={submitForm}>
        <Text style={{fontWeight: 'bold'}}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 15,
          marginBottom: 5,
          fontSize: 12,
          color:'grey',
        
        }}>
        Trouble signing in?
      </Text>
      <View style={styles.signUp}>
        <Text style={{color:'grey'}}>
          Don't have an account{' '}
          <Text onPress={()=>navigation.navigate('Register')}
            style={{
              color: 'orange',
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}>
            Sign up now
          </Text>
        </Text>
      </View>
      <View style={styles.icons}><Icon style={{marginRight:10}} name="google" size={35} color="#4285F4" />
     <Icon style={{marginLeft:10}} name="facebook-square" size={35} color="#4267B2"/>
      </View>
     
    </View>
    </View>
    </FastImage>
      );
};

const styles = StyleSheet.create({
  maincontainer:{
    backgroundColor: '#fff',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    padding:15,
    justifyContent:"center"
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor:"#CCCCCC",
    padding: 10,
    color:'grey'
  
  },
  btn: {
    marginTop: 10,
  },
  signIn: {
    marginBottom: 10,
    color:'grey'
  },
  signUp: {
    margin: 10,
    alignSelf: 'center',
    
  },
  signinBtn: {
    backgroundColor: 'orange',
    height: 35,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons:{
    flexDirection:'row',
    justifyContent:"center",
    margin:10,
    
  }
});

export default Login;
