import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";

export default function Bold({ fontBold }) {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  let fontSize = 45;
  let paddingVertical = 6;
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Poppins_500Medium",
          color: "white",
          opacity: 0.7,
        }}
      >
        {fontBold}
      </Text>
    );
  }
}
