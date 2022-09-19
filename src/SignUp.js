import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userAction';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_pass, setCnfPassword] = useState('');
  const [tc, setTc] = useState(false);

  const dispatch = useDispatch();

  const submitForm = async () => {
    try {
      const a = await dispatch(
        registerUser({ name, email, phone_number, password, confirm_pass, tc })
      );
      a.payload.token ? navigation.replace('Splashscreen') : null;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'orange' }}>
      <View style={styles.maincontainer}>
        <Text style={styles.welcome}>Sign Up</Text>

        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          value={phone_number}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Number"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          placeholder="Password"
        />
        <TextInput
          value={confirm_pass}
          onChangeText={(text) => setCnfPassword(text)}
          secureTextEntry
          style={styles.input}
          placeholder="Confirm password"
        />
        <View style={styles.checkboxContainer}>
          <CheckBox value={tc} onValueChange={setTc} style={styles.checkbox} />
          <Text style={styles.label}>I accept terms and conditions</Text>
        </View>
        <TouchableOpacity style={styles.signinBtn} onPress={submitForm}>
          <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>OR</Text>
        </View>
        <TouchableOpacity style={styles.signinBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'whitesmoke',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    color: 'black',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10
  },

  signinBtn: {
    backgroundColor: 'orange',
    height: 35,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    margin: 8
  }
});

export default SignUp;
