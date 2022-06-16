import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";

export default function ProfileButton({ naming }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{naming}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    opacity: 0.4,
  },
  button: {
    borderWidth: 1,
    height: 50,
    width: "75%",
    borderRadius: 16,
    backgroundColor: "#1B1B36",
    elevation: 10,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  buttonText: {
    color: "pink",
    textAlign: "center",
    fontFamily: "Poppins_300Light",
    color: "white",
    opacity: 0.7,
    paddingTop: 12,
    fontSize: 15,
    paddingVertical: 6,
  },
});
