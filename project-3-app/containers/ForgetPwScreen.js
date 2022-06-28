import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Register from "../api/Register";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";
import Med from "../assets/Poppins_Medium";

export default function ForgetPwScreen({ navigation, props }) {
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
        <View style={{ paddingBottom: "15%", paddingTop: "5%" }}>
          <Small fontSmall="Enter your registered email below"></Small>
          <TouchableOpacity>
            <TextInput
              onChangeText={(text) => validate(text)}
              style={styles.userInput}
              keyboardType="email-address"
              theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
            ></TextInput>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
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
});
