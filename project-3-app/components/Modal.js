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

export default function Modal({ firstLine, textForInput }) {
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <View>
        {/* <Pressable
          onPress={toggleBottomNavigationView}

          //on Press of the button bottom sheet will be visible
        >
          <Text style={{ color: "white" }}>Show</Text>
        </Pressable> */}

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
                colors={["rgba(91,49,72,0.5)", "rgba(255,255,255,0.1)"]}
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
                    width: "80%",
                  }}
                >
                  <Small fontSmall={firstLine}></Small>
                </View>
                <TouchableOpacity>
                  <TextInput
                    // onChangeText={(text) => validate(text)}
                    style={styles.userInput}
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                  >
                    {textForInput}
                  </TextInput>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: "center",
                    width: "80%",
                    paddingTop: "3%",
                  }}
                >
                  <Small fontSmall={"Enter your password to confirm"}></Small>
                </View>

                <TouchableOpacity>
                  <TextInput
                    // onChangeText={(text) => validate(text)}
                    style={styles.userInput}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    theme={{ colors: { text: "rgba(255, 255, 255, 0.6)" } }}
                  ></TextInput>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingTop: "3%",
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
    height: 270,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  gradient: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 270,
  },
  userInput: {
    height: 40,
    backgroundColor: "rgba(31,29,28,0.3)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "80%",
    alignSelf: "center",
  },
});
