import { Text, View, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_300Light } from "@expo-google-fonts/poppins";

export default function Small({ fontSmall }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });

  let fontSize = 15;
  let paddingVertical = 6;
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Poppins_300Light",
          color: "white",
          opacity: 0.7,
        }}
      >
        {fontSmall}
      </Text>
    );
  }
}
