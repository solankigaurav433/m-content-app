import { createAsyncThunk } from "@reduxjs/toolkit";
import {BASE_URL} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Alert } from "react-native";
// import { CommonActions, useNavigation } from '@react-navigation/native';


export const registerUser = createAsyncThunk(

    // action type string
    'user/register',
    // callback function
    async ({ name, email,phone_number, password, confirm_pass, tc }, { rejectWithValue }) => {
       
        try {
           
        console.log("start");
        console.log("name, email ", name, email, phone_number);
    // configure header's Content-Type as JSON
    const config = {
    headers: {
    'Content-Type': 'application/json',
    },
    }
    // make request to backend
    const data1 ={
          name:name,
          email:email,
          password:password,
          confirm_pass:confirm_pass,
          phone_number:phone_number,
          tc:tc
        }
console.log("data1 ", data1);
   const {data, status} = await axios.post(
        `${BASE_URL}/register`,
   data1,
    config
    )
    
    console.log("token data from reg ",data, data.token, " ", data.refresh_token);
    if(status === 201){
        AsyncStorage.setItem('userToken', data.token);
        AsyncStorage.setItem('refresh_token', data.refresh_token);
     
        Alert.alert("Thankyou for registering")
      
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
      } else if(data.status === 'failed_ExistUser'){
        Alert.alert("Email already exists",
        "You must login or try registering with another email",
        [
          { text: "OK"}
        ]);
      }
      else if(data.status === 'failed_Registration'){
        Alert.alert("Registration failed, please try again later");
      }else if(data.status === 'failed_!Pass'){
        Alert.alert("Password mismatch",
        "Password and confirm password should be same",
        [
          { text: "OK"}
        ]);

      }else if(data.status === 'failed_EmptyFields'){
          Alert.alert("Please fill all data",
        "All fields are required",
        [
          { text: "OK"}
        ]);

      }
    
    return data;
    } catch (error) {
        console.log("err ", error)
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
        console.log("error from catch");
    return rejectWithValue(error.response.data.message)
    } else {
        console.log("error from catch else", error)
    return rejectWithValue(error.message)
    }
    }
    
    }
    )

    export const loginUser = createAsyncThunk(

        // action type string
        'user/register',
        // callback function
        async ({  email, password }, { rejectWithValue }) => {
         
            try {
            console.log("start login");
            console.log(" email ",  email);
        // configure header's Content-Type as JSON
        const config = {
        headers: {
        'Content-Type': 'application/json',
        },
        }
        // make request to backend
        const data1 ={
            email:email,
              password:password,
              
            }
    console.log("data1 ", data1);
       const {data} = await axios.post(
            `${BASE_URL}/login`,
       data1,
        config
        )
        
        console.log("token data from reg ",data.token, " ", data.refresh_token);
        if(data.status === "success_login"){
            AsyncStorage.setItem('userToken', data.token);
            AsyncStorage.setItem('refresh_token', data.refresh_token);
            Alert.alert("You are logged In",
            "You will be redirected to App",
            [
              { text: "OK"}
            ]);
           
           
          }else if(data.status === 'failed_EmptyFields'){
            Alert.alert("Please fill all data",
          "All fields are required",
          [
            { text: "OK"}
          ]);
      
        }  
          else if(data.status === 'failed_!EmailPass'){
            Alert.alert("Wrong credentials",
            "Please check your credentials",
            [
              { text: "OK"}
            ]);
          }
          else if(data.status === 'failed_!RegUser'){
            Alert.alert("User doesn't exist");
            }
          else if(data.status === 'failed_login'){
            Alert.alert("Some error",
            "Try again later",
            [
              { text: "OK"}
            ]);
      
          }
      
        
        return data;
        } catch (error) {
            console.log("err ", error)
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            console.log("error from catch");
        return rejectWithValue(error.response.data.message)
        } else {
            console.log("error from catch else", error)
        return rejectWithValue(error.message)
        }
        }
        
        }
        )
    