import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import chevronDown from "../assets/chevronDown.png";
import Small from "../assets/Poppins_Small";
import { TextInput } from "react-native-paper";
import LogOutButton from "./LogOutButton";
import { LinearGradient } from "expo-linear-gradient";

export default function ModalEditPassword() {
  const [visible, setVisible] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <View>
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom sheet
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                // flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <LinearGradient
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["rgba(111,94,73,0.5)", "rgba(48,42,34,0.3)"]}
              >
                <Image
                  source={chevronDown}
                  style={{
                    height: 50,
                    width: 50,
                    opacity: 0.8,

                    alignSelf: "center",
                  }}
                />
                <View
                  style={{
                    alignSelf: "center",
                    width: "70%",
                  }}
                >
                  <Small fontSmall={"New Password"}></Small>
                </View>
                <TouchableOpacity style={styles.textContainer}>
                  <TextInput
                    // onChangeText={(text) => validate(text)}
                    style={styles.userInput}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                    secureTextEntry={passwordVisible}
                    right={
                      <TextInput.Icon
                        name={passwordVisible ? "eye" : "eye-off"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        // onChangeText={setPassword}
                      />
                    }
                  ></TextInput>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: "center",
                    width: "70%",
                    paddingTop: "3%",
                  }}
                >
                  <Small
                    fontSmall={"Enter your old password to confirm"}
                  ></Small>
                </View>

                <TouchableOpacity style={styles.textContainer}>
                  <TextInput
                    // onChangeText={(text) => validate(text)}
                    style={styles.userInput}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                    secureTextEntry={passwordVisible}
                    right={
                      <TextInput.Icon
                        name={passwordVisible ? "eye" : "eye-off"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        // onChangeText={setPassword}
                      />
                    }
                  ></TextInput>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingTop: "5%",
                    width: "85%",
                    alignSelf: "center",
                  }}
                >
                  <LogOutButton naming="Save Changes"></LogOutButton>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "rgba(000,000,000,0.4)",
    height: 280,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  gradient: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 280,
  },
  textContainer: {
    overflow: "hidden",
    height: 40,
    borderColor: "rgba(255,255,255, 0.4)",
    backgroundColor: "rgba(31,29,28,0.3)",
    borderWidth: 1,
    width: "70%",
    borderRadius: 16,
    alignSelf: "center",
  },

  userInput: {
    height: 40,
    backgroundColor: "rgba(31,29,28,0.1)",
    overflow: "hidden",
  },
});
