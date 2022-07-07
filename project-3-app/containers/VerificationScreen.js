import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator
} from "react-native";
import { TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import Buttons from "../components/Buttons";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Med from "../assets/Poppins_Medium";
import jwt_decode from 'jwt-decode';

export default function VerificationScreen({ navigation, props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(undefined);
  const [codeToken, setCodeToken] = useState(undefined);

  async function expiryTimeout() {
    const token = await SecureStore.getItemAsync('tokenForgotPw');
    const time = new Date().getTime() / 1000;
    if (token.exp < time) {
      alert('Verification timeout. Please get a new verification code again.');
      navigation.navigate('WelcomeScreen');
    }
  }
  expiryTimeout();

  async function getJwt() {
    const token = await SecureStore.getItemAsync('tokenForgotPw');
    const decoded = jwt_decode(token);

    const code = decoded.code;
    const newCode = code.toString();
    setCodeToken(newCode)
    console.log(newCode);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getJwt();     
    }, 1000);
  }, []);

  const VerifyCode = async () => {
    if (codeToken == code) {
      navigation.navigate('ResetPwScreen');
    }else{
      alert('Invalid code. Please try again.')
    }
  };

  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="ForgetPwScreen"/>
      <View style={styles.container}>
        <View style={{ paddingBottom: "5%" }}>
          <Bold fontBold="Verification"></Bold>
        </View>
        <View style={{ paddingBottom: "5%" }}>
          {/* <Med fontMed={"No worries,"}></Med> */}

          <Med
            fontMed={"Please enter the 6-digit code sent to your email."}
          ></Med>
        </View>
              <View style={{ paddingBottom: "15%", paddingTop: "5%" }}>
                  <TouchableOpacity
                    style={[
                      styles.textContainer,
                      {
                        borderColor:
                          code === undefined ||
                          code.length < 1 ||
                          code.length > 5
                            ? "rgba(255, 255, 255, 0.4)"
                            : "rgba(244, 107, 107, 0.4)",
                      },
                    ]}
                  >
                  <TextInput
                    style={[styles.userInput]}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    autoFocus={true}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                  ></TextInput>
                  </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={
                  !(code) ? styles.disabled : styles.normal
                }
                onPress={() =>
                  VerifyCode({ code }, setIsLoading(true))
                    .then(() => setIsLoading(false))
                }
                disabled={!(code)}
              >
                <Buttons naming="Verify"></Buttons>
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
