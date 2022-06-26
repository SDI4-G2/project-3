import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function UserField({ value }) {
  return (
    <View>
      <TextInput
        style={styles.userInput}
        theme={{ colors: { text: "white" } }}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  userInput: {
    height: 50,
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
});
