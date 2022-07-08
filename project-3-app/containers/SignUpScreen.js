import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Register from "../api/Register";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";
import Validator from "email-validator";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="WelcomeScreen" />
      <View style={styles.container}>
        <View style={styles.padding}>
          <Bold fontBold="Join Us"></Bold>
          <View style={styles.fieldsInput}>
            <Small fontSmall="Username"></Small>
            <TouchableOpacity
              style={[
                styles.textContainer,
                {
                  borderColor:
                    username.length < 1 || username.length > 5
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(244, 107, 107, 0.4)",
                },
              ]}
            >
              <TextInput
                style={styles.userInput}
                theme={{
                  colors: {
                    text: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                value={username}
                onChangeText={setUsername}
                autoFocus={true}
              ></TextInput>
            </TouchableOpacity>
            <Text
              style={[
                username.length < 1 || username.length > 5
                  ? styles.normalTwo
                  : styles.disabledTwo,
              ]}
            >
              Username must be 6 characters long
            </Text>
            <View style={{ paddingTop: "0%" }}>
              <Small fontSmall="Email"></Small>
            </View>
            <TouchableOpacity
              style={[
                styles.textContainer,
                {
                  borderColor:
                    email.length < 1 || Validator.validate(email)
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(244, 107, 107, 0.4)",
                },
              ]}
            >
              <TextInput
                style={styles.userInput}
                theme={{
                  colors: {
                    text: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                value={email}
                onChangeText={setEmail}
              ></TextInput>
            </TouchableOpacity>
            <Text
              style={[
                email.length < 1 || Validator.validate(email)
                  ? styles.normalTwo
                  : styles.disabledTwo,
              ]}
            >
              Please provide a valid email
            </Text>
            <View style={{ paddingTop: "0%" }}>
              <Small fontSmall="Password"></Small>
            </View>
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
                onPress={() => setPasswordVisible(!passwordVisible)}
                onChangeText={setPassword}
                style={styles.userInput}
                theme={{
                  colors: {
                    text: "rgba(255, 255, 255, 0.6)",
                  },
                }}
                secureTextEntry={passwordVisible}
                right={
                  <TextInput.Icon
                    name={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    onChangeText={setPassword}
                    color={"rgba(255,255,255,0.5)"}
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
              !username || !email || !password ? styles.disabled : styles.normal
            }
            onPress={() =>
              Register(
                { email, username, password, navigation },
                setIsLoading(true)
              ).then(() => setIsLoading(false))
            }
            disabled={!username || !email || !password}
          >
            <Buttons naming="Sign Up"></Buttons>
            {isLoading === true && (
              <ActivityIndicator style={styles.loading} color={"#fff"} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingTop: "5%", flexDirection: "row" }}
            onPress={() => navigation.navigate("WelcomeScreen")}
          >
            <Small fontSmall={"Already have an account? "}></Small>
            <Underline fontUnderline="Log In"></Underline>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: "10%",
  },

  textContainer: {
    overflow: "hidden",
    height: 55,
    borderColor: "rgba(255,255,255, 0.4)",
    borderWidth: 1,
    borderRadius: 16,
  },

  buttonsbottom: {
    top: "10%",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 55,

    backgroundColor: "rgba(255,255,255, 0.05)",
    borderColor: "rgba(255,255,255, 0.3)",
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
  disabledTwo: {
    color: "rgba(226,91,91,0.6)",
    textAlign: "center",
  },
  normalTwo: { color: "transparent" },
});
