import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ButtonsOne({ naming }) {
  return (
    <LinearGradient
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#6A68E2", "#FF98B7"]}
    >
      <Text style={styles.buttonText}>{naming}</Text>
    </LinearGradient>
  );
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
    width: "80%",
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
