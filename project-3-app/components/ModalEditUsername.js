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
import EditUsername from "../api/EditUsername";

export default function Modal({
  usernameInput,
  useremailInput,
  textForInput,
  navigation,
}) {
  const [visible, setVisible] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState(useremailInput);
  const [username, setUsername] = useState(usernameInput);
  const [password, setPassword] = useState("");

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
                colors={["rgba(85,73,111,0.5)", "rgba(53,35,60,0.2)"]}
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
                  <Small fontSmall={"Edit Username"}></Small>
                </View>
                <TouchableOpacity
                  style={[
                    styles.textContainer,
                    {
                      borderColor:
                        username === undefined ||
                        username.length < 1 ||
                        username.length > 5
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(244, 107, 107, 0.4)",
                    },
                  ]}
                >
                  <TextInput
                    // onChangeText={(text) => validate(text)}
                    style={styles.userInput}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                    defaultValue={usernameInput}
                    onChangeText={setUsername}
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
                <View
                  style={{
                    alignSelf: "center",
                    width: "70%",
                    paddingTop: "0%",
                  }}
                >
                  <Small fontSmall={"Enter your password to confirm"}></Small>
                </View>

                <TouchableOpacity
                  style={[
                    styles.textContainer,
                    {
                      borderColor:
                        password === undefined ||
                        password.length < 1 ||
                        password.length > 5
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(244, 107, 107, 0.4)",
                    },
                  ]}
                >
                  <TextInput
                    onChangeText={setPassword}
                    style={styles.userInput}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                    secureTextEntry={passwordVisible}
                    right={
                      <TextInput.Icon
                        name={passwordVisible ? "eye-off" : "eye"}
                        color={"rgba(255,255,255,0.5)"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      />
                    }
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
                <TouchableOpacity
                  style={[
                    username.length < 6 ||
                    email.length < 6 ||
                    password.length < 6
                      ? styles.disabled
                      : styles.normal,
                    styles.position,
                  ]}
                  disabled={
                    username.length < 6 ||
                    email.length < 6 ||
                    password.length < 6
                  }
                  onPress={async () =>
                    await EditUsername({
                      email,
                      username,
                      password,
                      navigation,
                    }).then((res) => setVisible(res))
                  }
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
    backgroundColor: "rgba(48,43,58,0.1)",
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.5,
    paddingTop: "5%",
    width: "85%",
    alignSelf: "center",
  },
  normal: {
    paddingTop: "5%",
    width: "85%",
    alignSelf: "center",
  },
  disabledTwo: {
    color: "rgba(226,91,91,0.6)",

    textAlign: "center",
  },
  normalTwo: { color: "transparent", textAlign: "center" },
  position: {
    bottom: "6%",
  },
});
