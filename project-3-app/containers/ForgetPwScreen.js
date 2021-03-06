import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Text,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import Validator from "email-validator";

import Buttons from "../components/Buttons";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Med from "../assets/Poppins_Medium";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import ForgetPassword from "../api/ForgetPassword";

export default function ForgetPwScreen({ navigation, props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
  });
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <SafeAreaView>
        <SecondHeaderBar backScreen="WelcomeScreen" />
        <Pressable onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{ paddingBottom: "5%" }}>
              <Bold fontBold="No worries,"></Bold>
            </View>
            <View style={{ paddingBottom: "5%" }}>
              <Med
                fontMed={
                  "We will send you a verification code to reset your password."
                }
              ></Med>
            </View>
            {errorMsg ? (
              <Text
                style={{ color: "rgba(226,91,91,0.6)", textAlign: "center" }}
              >
                {errorMsg}, please try again.
              </Text>
            ) : (
              <Text style={{ color: "transparent" }}>word</Text>
            )}
            <View style={{ paddingBottom: "15%", paddingTop: "0%" }}>
              <Small fontSmall="Enter your registered email below"></Small>
              <Pressable
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
                  style={[styles.userInput]}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChange={() => setErrorMsg(null)}
                  theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                  onSubmitEditing={() => {
                    {
                      Validator.validate(email)
                        ? ForgetPassword(
                            { email, navigation },
                            setIsLoading(true)
                          )
                            .then((res) => setErrorMsg(res))

                            .then(() => setIsLoading(false))
                        : null;
                    }
                  }}
                ></TextInput>
              </Pressable>
              <Text
                style={[
                  email.length < 1 || Validator.validate(email)
                    ? styles.normalTwo
                    : styles.disabledTwo,
                ]}
              >
                Please provide a valid email
              </Text>
            </View>

            <TouchableOpacity
              style={
                Validator.validate(email) ? styles.normal : styles.disabled
              }
              disabled={!Validator.validate(email)}
              onPress={() =>
                ForgetPassword({ email, navigation }, setIsLoading(true))
                  .then((res) => setErrorMsg(res))

                  .then(() => setIsLoading(false))
              }
            >
              <Buttons naming="Send Code"></Buttons>
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
          </View>
        </Pressable>
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

  userInput: {
    height: 55,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },

  sendEmail: (isValid) => ({
    opacity: isValid ? 1 : 0.4,
  }),
  disabledTwo: {
    color: "rgba(226,91,91,0.6)",
    textAlign: "center",
  },
  normalTwo: { color: "transparent" },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  loading: {
    position: "absolute",
    zIndex: 10000,
  },
});
