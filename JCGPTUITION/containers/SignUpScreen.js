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
import Register from "../api/Register";
import HeaderBar from "../components/Headers";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [disabled, setDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <HeaderBar />
      <Bold fontBold="Join Us"></Bold>
      <TouchableOpacity style={styles.textContainer}>
        <Small fontSmall="Username"></Small>
        <TextInput value={username} onChangeText={setUsername}></TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        <Small fontSmall="Email"></Small>
        <TextInput value={email} onChangeText={setEmail}></TextInput>
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
          !username || !email || !password ? styles.disabled : styles.normal
        }
        onPress={() => Register({ email, username, password, navigation })}
        disabled={!username || !email || !password}
      >
        <Buttons naming="Sign Up"></Buttons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    padding: "5%",
    top: 0,
    // flexDirection: "column",
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

  // title: {
  //   paddingLeft: "10%",
  //   paddingRight: "10%",
  //   paddingTop: "-20%",
  //   paddingBottom: "20%",
  //   flexDirection: "column",
  // },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
});
