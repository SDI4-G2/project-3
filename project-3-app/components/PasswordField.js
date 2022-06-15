import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function PasswordField() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View>
      <TextInput
        style={styles.userInput}
        theme={{ colors: { text: "white" } }}
        secureTextEntry={passwordVisible}
        right={
          <TextInput.Icon
            name={passwordVisible ? "eye" : "eye-off"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  userInput: {
    height: 55,
    backgroundColor: "transparent",
    borderColor: "#667080",
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "80%",
    alignSelf: "center",
  },
});
