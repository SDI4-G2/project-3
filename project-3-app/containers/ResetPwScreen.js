import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Text,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import Buttons from "../components/Buttons";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Med from "../assets/Poppins_Medium";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import ResetPassword from "../api/ResetPassword";

export default function ResetPwScreen({ navigation, props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const newPwRef = useRef();

  async function expiryTimeout() {
    const token = await SecureStore.getItemAsync("tokenForgotPw");
    const time = new Date().getTime() / 1000;
    if (token.exp < time) {
      alert("Verification timeout. Please get a new verification code again.");
      navigation.navigate("WelcomeScreen");
    }
  }
  expiryTimeout();

  async function getJwt() {
    const token = await SecureStore.getItemAsync("tokenForgotPw");
    const decoded = jwt_decode(token);
    console.log(token);
    const email = decoded.email;
    setEmail(email);
    console.log(email);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getJwt();
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="ForgetPwScreen" />
      <View style={styles.container}>
        <View style={{ paddingBottom: "0%" }}>
          <Bold fontBold="Reset Password"></Bold>
        </View>
        <View style={{ paddingBottom: "5%" }}>
          <Med fontMed={"Please enter your new password."}></Med>
        </View>
        <View style={{ paddingBottom: "15%", paddingTop: "5%" }}>
          <View style={{ paddingTop: "5%" }}>
            {errorMessage ? (
              <Text style={{ color: "rgba(226,91,91,0.6)", bottom: "5%" }}>
                {errorMessage}
              </Text>
            ) : (
              <Text style={{ color: "transparent" }}>hello</Text>
            )}
            <Small fontSmall="New Password"></Small>
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
                onChangeText={setPassword}
                style={[styles.userInput]}
                autoFocus={true}
                theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                secureTextEntry={true}
                returnKeyType="next"
                onChange={() => setErrorMessage(null)}
                onSubmitEditing={() => {
                  {
                    password.length > 5 ? newPwRef.current.focus() : null;
                  }
                }}
                blurOnSubmit={false}
              ></TextInput>
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
          <View>
            <Small fontSmall="Confirm New Password"></Small>
            <TouchableOpacity
              style={[
                styles.textContainer,
                {
                  borderColor:
                    confirmPassword.length < 1 || confirmPassword.length > 5
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(244, 107, 107, 0.4)",
                },
              ]}
            >
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={[styles.userInput]}
                theme={{
                  colors: {
                    text: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                secureTextEntry={true}
                onChange={() => setErrorMessage(null)}
                ref={newPwRef}
                onSubmitEditing={() => {
                  password.length > 5 && confirmPassword.length > 5
                    ? ResetPassword(
                        { email, password, confirmPassword, navigation },
                        setIsLoading(true)
                      )
                        .then((res) => setErrorMessage(res))
                        .then(() => setIsLoading(false))
                    : null;
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={
            password.length < 6 || confirmPassword.length < 6
              ? styles.disabled
              : styles.normal
          }
          disabled={password.length < 6 || confirmPassword.length < 6}
          onPress={() =>
            ResetPassword(
              { email, password, confirmPassword, navigation },
              setIsLoading(true)
            )
              .then((res) => setErrorMessage(res))
              .then(() => setIsLoading(false))
          }
        >
          <Buttons naming="Save"></Buttons>
          {isLoading === true && (
            <ActivityIndicator
              style={styles.loading}
              color={"rgba(255,255,255,0.5)"}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "10%",
  },

  textContainer: {
    overflow: "hidden",
    height: 55,
    borderColor: "rgba(255,255,255, 0.4)",
    borderWidth: 1,
    borderRadius: 16,
  },

  userInput: {
    height: 55,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    // borderColor: "rgba(255, 255, 255, 0.3)",
    // borderWidth: 1,
    // borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  loading: {
    position: "absolute",
    zIndex: 10000,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  disabledTwo: {
    color: "rgba(226,91,91,0.6)",
    textAlign: "center",
  },
  normalTwo: { color: "transparent", textAlign: "center" },
});
