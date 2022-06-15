import { Text, TouchableOpacity, StyleSheet, View, Button } from "react-native";
import { TextInput } from "react-native-paper";

import Buttons from "../components/Buttons";
import Register from "../api/Register";
import SecondHeaderBar from "../components/SecondHeader";
import Bold from "../assets/Poppins_Bold";
import Small from "../assets/Poppins_Small";
import Underline from "../assets/Poppins_Underline";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <SecondHeaderBar />
      <View style={styles.padding}>
        <Bold fontBold="Edit Profile"></Bold>
        <View style={styles.fieldsInput}>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Username"></Small>
            <TextInput
              style={styles.userInput}
              theme={{ colors: { text: "white" } }}
            ></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Email"></Small>
            <TextInput
              style={styles.noInput}
              editable={false}
              value={"This Cannot Be Edited"}
              theme={{ colors: { text: "white" } }}
            ></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Small fontSmall="Password"></Small>
            <TextInput
              style={styles.userInput}
              theme={{ colors: { text: "white" } }}
              right={<TextInput.Icon />}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsbottom}>
        <TouchableOpacity>
          <Buttons naming="Save Changes"></Buttons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: "3%",
  },

  fieldsInput: {
    top: "3%",
  },

  buttonsbottom: {
    top: "10%",
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 55,
    backgroundColor: "transparent",
    borderColor: "#667080",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
  },
  noInput: {
    height: 55,
    backgroundColor: "#BAC0CA",
    borderColor: "#667080",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "white",
    opacity: 0.4,
    width: "100%",
    alignSelf: "center",
  },
});
