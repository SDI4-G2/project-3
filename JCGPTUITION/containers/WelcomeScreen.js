import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Button,
} from "react-native";

import Buttons from "../components/Buttons";
import Login from "../api/Login";
import HeaderBar from "../components/Headers";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";

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
      <Bold fontBold="Welcome!"></Bold>
      <TouchableOpacity style={styles.textContainer}>
        <Small fontSmall="Username / E-mail"></Small>
        <TextInput onChangeText={(text) => validate(text)}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Small fontSmall="Password"></Small>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          !(username || email) || !password ? styles.disabled : styles.normal
        }
        onPress={() => Login({ email, username, password, navigation })}
        disabled={!(username || email) || !password}
      >
        <Buttons naming="Log In"></Buttons>
      </TouchableOpacity>

      <Underline
        fontUnderline="Sign Up"
        onPress={() => navigation.navigate("SignUpScreen")}
      ></Underline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: "center",
    padding: "5%",
    top: 100,
    flexDirection: "column",
  },
  textContainer: {
    // flex: 0,
    // paddingLeft: "10%",
    // paddingRight: "10%",
    // paddingTop: 10,
    // paddingBottom: 10,
    // flexDirection: 'column',
    top: "20%",
  },

  title: {
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "-20%",
    paddingBottom: "20%",
    flexDirection: "column",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
});
