import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Login from "../api/Login";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";

export default function WelcomeScreen({ navigation, props }) {
  const [email, setEmail] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        <TouchableOpacity
          style={[
            styles.textContainer,
            {
              borderColor:
                username === undefined ||
                username.length < 1 ||
                username.length > 5
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(244, 107, 107, 0.4)",
            },
          ]}
        >
          <TextInput
            underlineColorAndroid="transparent"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={(text) => validate(text)}
            style={[styles.userInput]}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            theme={{
              colors: {
                text: "rgba(255, 255, 255, 0.6)",
              },
            }}
          ></TextInput>
        </TouchableOpacity>
        <View style={{ paddingTop: "5%" }}>
          <Small fontSmall="Password"></Small>
          <TouchableOpacity
            style={[
              styles.textContainer,
              {
                borderColor:
                  password === undefined ||
                  password.length < 1 ||
                  password.length > 5
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(244, 107, 107, 0.4)",
              },
            ]}
          >
            <TextInput
              value={password}
              onPress={() => setPasswordVisible(!passwordVisible)}
              onChangeText={setPassword}
              style={[styles.userInput]}
              theme={{
                colors: {
                  text: "rgba(255, 255, 255, 0.6)",
                },
              }}
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
      </View>
      <View style={styles.buttonsbottom}>
        <TouchableOpacity
          style={
            !(username || email) || !password ? styles.disabled : styles.normal
          }
          onPress={() =>
            Login({ email, username, password, navigation }, setIsLoading(true))
              .then(() => setIsLoading(false))
              .then(() => setPassword(""))
          }
          disabled={!(username || email) || !password}
        >
          <Buttons naming="Log In"></Buttons>
          {isLoading === true && (
            <ActivityIndicator
              style={styles.loading}
              color={"rgba(255,255,255,0.5)"}
            />
          )}
        </TouchableOpacity>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.flexSpacing}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Small fontSmall="Or "></Small>

            <Underline fontUnderline="Sign Up"></Underline>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPwScreen")}
          >
            <Underline fontUnderline="Forgot Password?"></Underline>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
    top: "10%",
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

  textContainer: {
    overflow: "hidden",
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  userInput: {
    height: 55,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },
  loading: {
    position: "absolute",
    zIndex: 10000,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  flexSpacing: {
    flexDirection: "row",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
  },
});
