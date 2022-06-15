import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";

export default function ButtonsOne({ naming }) {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  let fontSize = 20;
  let paddingVertical = 6;
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <LinearGradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#6A68E2", "#FF98B7"]}
      >
        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: "Poppins_500Medium",
            color: "white",
            opacity: 0.7,

            textAlign: "center",
          }}
        >
          {naming}
        </Text>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  gradient: {
    alignSelf: "center",
    top: 200,
    justifyContent: "center",
    borderRadius: 6,
    width: "100%",
    shadowColor: "#FF98B7",
    elevation: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
    fontWeight: "600",
  },
});
