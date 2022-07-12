import React, { useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Login from "../api/Login";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";

export default function WelcomeScreen({ navigation, props }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const passwordRef = useRef();

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      setEmail(text);
      setUsername(undefined);
      setUserEmail(text);
      // console.log("email " + userEmail);
      // console.log("email" + email);
    } else {
      setUsername(text);
      setEmail(undefined);
      setUserEmail(text);
      // console.log("username " + userEmail);
      // console.log("username" + username);
    }
  }

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View style={styles.container}>
        <Pressable onPress={Keyboard.dismiss}>
          <Bold fontBold="Welcome!"></Bold>
          <View style={styles.fieldsInput}>
            {ErrMsg ? (
              <Text style={{ color: "rgba(226,91,91,0.6)", bottom: "5%" }}>
                {ErrMsg}
              </Text>
            ) : null}

            <Small fontSmall="Username / E-mail"></Small>
            <TouchableOpacity
              style={[
                styles.textContainer,
                {
                  borderColor:
                    userEmail.length < 1 || userEmail.length > 5
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
                returnKeyType="next"
                onChange={() => setErrMsg(null)}
                onSubmitEditing={() => {
                  {
                    userEmail.length > 5 ? passwordRef.current.focus() : null;
                  }
                }}
                blurOnSubmit={false}
                theme={{
                  colors: {
                    text: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              ></TextInput>
            </TouchableOpacity>
            <Text
              style={[
                userEmail.length < 1 || userEmail.length > 5
                  ? styles.normalTwo
                  : styles.disabledTwo,
              ]}
            >
              Username must be 6 characters long
            </Text>
            <View style={{ paddingTop: "0%" }}>
              <Small fontSmall="Password"></Small>
              <TouchableOpacity
                style={[
                  styles.textContainer,
                  {
                    borderColor:
                      password.length < 1 || password.length > 5
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
                  onChange={() => setErrMsg(null)}
                  ref={passwordRef}
                  onSubmitEditing={() => {
                    {
                      userEmail.length > 5 && password.length > 5
                        ? Login(
                            { email, username, password, navigation },
                            setIsLoading(true)
                          )
                            .then((res) => setErrMsg(res))
                            .then(() => setIsLoading(false))
                            .then(() => setPassword(""))
                        : null;
                    }
                  }}
                  theme={{
                    colors: {
                      text: "rgba(255, 255, 255, 0.6)",
                    },
                  }}
                  secureTextEntry={passwordVisible}
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? "eye-off" : "eye"}
                      color={"rgba(255,255,255,0.5)"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      onChangeText={setPassword}
                    />
                  }
                />
              </TouchableOpacity>
              <Text
                style={[
                  password.length < 1 || password.length > 5
                    ? styles.normalTwo
                    : styles.disabledTwo,
                ]}
              >
                Password must be 6 characters long
              </Text>
            </View>
          </View>
          <View style={styles.buttonsbottom}>
            <TouchableOpacity
              style={
                userEmail.length < 6 || password.length < 6
                  ? styles.disabled
                  : styles.normal
              }
              onPress={() => {
                Login(
                  { email, username, password, navigation },
                  setIsLoading(true)
                )
                  .then((res) => setErrMsg(res))
                  .then(() => setIsLoading(false))
                  .then(() => setPassword(""));
              }}
              disabled={userEmail.length < 6 || password.length < 6}
            >
              <Buttons naming="Log In"></Buttons>
              {isLoading === true && (
                <View
                  style={[
                    {
                      width: 100,
                      height: 100,
                      backgroundColor: "rgba(255, 255,255,0.2)",

                      borderRadius: 20,
                      justifyContent: "space-evenly",
                      alignSelf: "center",
                      bottom: 100,
                    },
                    styles.loading,
                  ]}
                >
                  <ActivityIndicator color={"rgba(255,255,255,0.5)"} />
                </View>
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
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
    top: "10%",
  },

  fieldsInput: {
    top: "15%",
  },

  buttonsbottom: {
    top: "20%",
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
  },
  flexSpacing: {
    flexDirection: "row",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
  },
  disabledTwo: {
    color: "rgba(226,91,91,0.6)",
    textAlign: "center",
  },
  normalTwo: { color: "transparent", textAlign: "center" },
});
