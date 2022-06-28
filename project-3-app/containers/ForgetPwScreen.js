import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import Buttons from "../components/Buttons";
import Register from "../api/Register";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";
import Med from "../assets/Poppins_Medium";

export default function ForgetPwScreen({ navigation, props }) {
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email"),
  });
  return (
    <SafeAreaView>
      <SecondHeaderBar />
      <View style={styles.container}>
        <View style={{ paddingBottom: "5%" }}>
          <Bold fontBold="Forgot Your Password?"></Bold>
        </View>
        <View style={{ paddingBottom: "5%" }}>
          <Med fontMed={"No worries,"}></Med>

          <Med fontMed={"We will send you an email."}></Med>
        </View>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={EmailSchema}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <>
              <View style={{ paddingBottom: "15%", paddingTop: "5%" }}>
                <Small fontSmall="Enter your registered email below"></Small>
                <Pressable>
                  <TextInput
                    style={[
                      styles.userInput,
                      {
                        borderColor:
                          values.email.length < 1 ||
                          Validator.validate(values.email)
                            ? "rgba(255, 255, 255, 0.4)"
                            : "rgba(244, 107, 107, 0.4)",
                      },
                    ]}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  ></TextInput>
                </Pressable>
              </View>

              <Pressable
                onPress={handleSubmit}
                style={styles.sendEmail(isValid)}
              >
                <Buttons naming="Send Email"></Buttons>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
  },

  userInput: {
    height: 55,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },

  sendEmail: (isValid) => ({
    opacity: isValid ? 1 : 0.4,
  }),
});
