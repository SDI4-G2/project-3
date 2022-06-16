import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';

import Buttons from '../components/Buttons';
import Register from '../api/Register';
import SecondHeaderBar from '../components/SecondHeader';
import Bold from '../assets/Poppins_Bold';
import Small from '../assets/Poppins_Small';
import Underline from '../assets/Poppins_Underline';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <SecondHeaderBar />
      <View style={styles.padding}>
        <Bold fontBold="Join Us"></Bold>
        <View style={styles.fieldsInput}>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Username"></Small>
            <TextInput
              style={styles.userInput}
              theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
              value={username}
              onChangeText={setUsername}
            ></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Email"></Small>
            <TextInput
              style={styles.userInput}
              theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
              value={email}
              onChangeText={setEmail}
            ></TextInput>

          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Password"></Small>
            <TextInput
              onPress={() => setPasswordVisible(!passwordVisible)}
              onChangeText={setPassword}
              style={styles.userInput}
              theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}

              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  onChangeText={setPassword}
                />
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsbottom}>
        <TouchableOpacity
          style={!username || !email || !password ? styles.disabled : styles.normal}
          onPress={() => Register({ email, username, password, navigation }, setIsLoading(true)).then(() => setIsLoading(false))}
          disabled={!username || !email || !password}
        >
          <Buttons naming="Sign Up"></Buttons>
          {isLoading === true && <ActivityIndicator style={styles.loading} color={'#fff'} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: '3%',
  },

  fieldsInput: {
    top: '3%',
  },

  buttonsbottom: {
    top: '10%',
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 55,

    backgroundColor: "rgba(27, 27, 54, 0.3)",
    borderColor: "rgba(102, 112, 128, 0.4)",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
  },
  loading: {
    position: 'absolute',
    zIndex: 10000,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
