import { Text, View, StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function Med({ fontMed }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  let fontSize = 20;
  let paddingVertical = 0;
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Poppins_400Regular",
          color: "white",
          opacity: 0.7,
        }}
      >
        {fontMed}
      </Text>
    );
  }
}
