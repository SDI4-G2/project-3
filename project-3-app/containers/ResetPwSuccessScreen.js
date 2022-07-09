import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Med from "../assets/Poppins_Medium";
import tickSuccess from "../assets/tickSuccess.png";

export default function ResetPwSuccessScreen({ navigation, props }) {
  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="WelcomeScreen" />
      <View style={styles.container}>
        <Image
          source={tickSuccess}
          style={{
            height: 200,
            width: 200,
            alignSelf: "center",
          }}
        />
        <View
          style={{
            paddingBottom: "8%",

            alignSelf: "center",
          }}
        >
          <Bold fontBold="Password Changed!"></Bold>
        </View>
        <View style={{ paddingBottom: "5%" }}>
          <Med
            fontMed={"Continue learning by logging in with your new password!"}
          ></Med>
        </View>

        <TouchableOpacity
          style={styles.normal}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          <Buttons naming="Log In"></Buttons>
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
});
