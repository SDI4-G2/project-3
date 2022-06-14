import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button } from 'react-native';

import Buttons from '../components/Buttons';
import Register from '../api/Register';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [disabled, setDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Us</Text>
      <TouchableOpacity style={styles.textContainer}>
        <Text>Username:</Text>
        <TextInput value={username} onChangeText={setUsername}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text>Email:</Text>
        <TextInput value={email} onChangeText={setEmail}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity
        style={!username || !email || !password ? styles.disabled : styles.normal}
        onPress={() => Register({ email, username, password, navigation })}
        disabled={!username || !email || !password}
      >
        <Buttons name="Sign Up"></Buttons>
      </TouchableOpacity>
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
    // paddingBottom: '-20%',
    flexDirection: 'column',
  },
  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
});
