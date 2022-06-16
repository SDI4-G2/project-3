import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Button } from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Login from "../api/Login";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";

export default function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordVisible, setPasswordVisible] = useState(true);

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      setEmail(text);
      setUsername(undefined);
      // console.log("email" + email);
    } else {
      setUsername(text);
      setEmail(undefined);
      // console.log("username" + username);
    }
  }

  return (
    <View style={styles.container}>
      <Bold fontBold="Welcome!"></Bold>
      <View style={styles.fieldsInput}>
        <Small fontSmall="Username / E-mail"></Small>
        <TouchableOpacity style={styles.textContainer}>
          <TextInput
            onChangeText={(text) => validate(text)}
            style={styles.userInput}
            keyboardType="email-address"
            theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
          ></TextInput>
        </TouchableOpacity>
        <Small fontSmall="Password"></Small>
        <TouchableOpacity style={styles.textContainer}>
          <TextInput
            onPress={() => setPasswordVisible(!passwordVisible)}
            onChangeText={setPassword}
            style={styles.userInput}
            theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
            secureTextEntry={passwordVisible}
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
                onChangeText={setPassword}
              />
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsbottom}>
        <TouchableOpacity
          style={
            !(username || email) || !password ? styles.disabled : styles.normal
          }
          onPress={() => Login({ email, username, password, navigation })}
          disabled={!(username || email) || !password}
        >
          <Buttons naming="Log In"></Buttons>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={styles.signUp}
        >
          <Small fontSmall="Or"></Small>
          <Underline fontUnderline="Sign Up"></Underline>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    top: "15%",
  },

  fieldsInput: {
    top: "20%",
  },

  buttonsbottom: {
    top: "30%",
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
    width: "100%",
    alignSelf: "center",
  },
});
