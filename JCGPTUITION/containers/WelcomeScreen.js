import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button } from 'react-native';

import Buttons from '../components/Buttons';
import Login from '../api/Login';

export default function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      setEmail(text);
      setUsername(undefined);
      //   console.log('email' + email);
    } else {
      setUsername(text);
      setEmail(undefined);
      //   console.log('username' + username);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity style={styles.textContainer}>
        <Text>Username/E-mail:</Text>
        <TextInput onChangeText={(text) => validate(text)}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity
        style={!(username || email) || !password ? styles.disabled : styles.normal}
        onPress={() => Login({ email, username, password, navigation })}
        disabled={!(username || email) || !password}
      >
        <Buttons name="Login"></Buttons>
      </TouchableOpacity>
      <Text style={styles.textContainer}>
        or{' '}
        <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('SignUpScreen')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    flexDirection: 'column',
  },
  textContainer: {
    // flex: 0,
    paddingLeft: '10%',
    paddingRight: '10%',
    // paddingTop: 10,
    // paddingBottom: 10,
    // flexDirection: 'column',
  },
  title: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '-20%',
    paddingBottom: '20%',
    flexDirection: 'column',
  },
  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
});
