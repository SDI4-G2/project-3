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
// import HeaderBar from "../components/Headers";
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
      {/* <HeaderBar /> */}
      <View style={styles.padding}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    padding: "1%",
    top: 0,
    // flexDirection: "column",
  },

  padding: {
    padding: "4%",
  },

  textContainer: {
    top: "20%",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
});
