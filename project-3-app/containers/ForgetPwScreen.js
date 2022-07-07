import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator
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
import ForgetPassword from "../api/ForgetPassword";

export default function ForgetPwScreen({ navigation, props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
  });
  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="WelcomeScreen" />
      <View style={styles.container}>
        <View style={{ paddingBottom: "5%" }}>
          <Bold fontBold="No worries,"></Bold>
        </View>
        <View style={{ paddingBottom: "5%" }}>
          {/* <Med fontMed={"No worries,"}></Med> */}
          <Med
            fontMed={"We will send you an email to get your password reset."}
          ></Med>
        </View>
              <View style={{ paddingBottom: "15%", paddingTop: "5%" }}>
                <Small fontSmall="Enter your registered email below"></Small>
                <TouchableOpacity
                    style={[
                      styles.textContainer,
                      {
                        borderColor:
                          email === undefined ||
                          email.length < 1 ||
                          email.length > 5
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
                    autoFocus={true}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                  ></TextInput>
                  </TouchableOpacity>
              </View>

              <TouchableOpacity
                 style={!email ? styles.disabled : styles.normal}
                 disabled={email.length < 6}
                  onPress={() =>
                    ForgetPassword({ email, navigation }, setIsLoading(true))
                      .then(() => setIsLoading(false))
                  }
                >
                <Buttons naming="Send Email"></Buttons>
              </TouchableOpacity>
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
});
