import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Keyboard,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import * as SecureStore from "expo-secure-store";

import Buttons from "../components/Buttons";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Med from "../assets/Poppins_Medium";
import jwt_decode from "jwt-decode";
import OTPInput from "../components/OTPInput";
import emailSent from "../assets/emailSent2.png";

export default function VerificationScreen({ navigation, props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeToken, setCodeToken] = useState(undefined);

  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 6;

  const [OTPErrMsg, setOTPErrMsg] = useState(null);

  async function expiryTimeout() {
    const token = await SecureStore.getItemAsync("tokenForgotPw");
    const time = new Date().getTime() / 1000;
    if (token.exp < time) {
      alert("Verification timeout. Please get a new verification code.");
      navigation.navigate("WelcomeScreen");
    }
  }
  expiryTimeout();

  async function getJwt() {
    const token = await SecureStore.getItemAsync("tokenForgotPw");
    const decoded = jwt_decode(token);

    const code = decoded.code;
    const newCode = code.toString();
    setCodeToken(newCode);
    console.log(newCode);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getJwt();
    }, 1000);
  }, []);

  const VerifyCode = async () => {
    if (codeToken == code) {
      navigation.navigate("ResetPwScreen");
    } else {
      setOTPErrMsg("6-digit code does not match. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <SecondHeaderBar backScreen="ForgetPwScreen" />
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              alignSelf: "center",
              bottom: "5%",
            }}
          >
            <Image
              source={emailSent}
              style={{
                height: 200,
                width: 200,
                alignSelf: "center",

                right: "2%",
              }}
            />

            <Bold fontBold="Code Sent"></Bold>
          </View>
          <View style={{ bottom: "7%" }}>
            <Med fontMed={"Please enter the 6-digit code sent to you."}></Med>
          </View>
          {OTPErrMsg ? (
            <Text style={{ color: "rgba(226,91,91,0.6)", bottom: "7%" }}>
              {OTPErrMsg}
            </Text>
          ) : null}
          <View style={{ paddingBottom: "10%", bottom: "5%" }}>
            <OTPInput
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={MAX_CODE_LENGTH}
            />
          </View>

          <TouchableOpacity
            style={!pinReady ? styles.disabled : styles.normal}
            onPress={() =>
              VerifyCode({ code }, setIsLoading(true)).then(() =>
                setIsLoading(false)
              )
            }
            disabled={!pinReady}
          >
            <Buttons naming="Verify"></Buttons>
            {isLoading === true && (
              <View
                style={[
                  {
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(255, 255,255,0.15)",
                    borderRadius: 20,
                    justifyContent: "space-evenly",
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
    bottom: 100,
    left: 110,
  },
});
