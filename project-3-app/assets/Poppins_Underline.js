import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";

export default function Underline({ fontUnderline }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });

  let fontSize = 13;
  // let paddingVertical = 10;
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Text
        style={{
          fontSize,
          // paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Poppins_300Light",
          color: "white",
          opacity: 0.7,
          textDecorationLine: "underline",
        }}
      >
        {fontUnderline}
      </Text>
    );
  }
}
