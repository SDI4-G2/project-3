import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function EditProfileField() {
  return (
    <View>
      <TextInput
        style={styles.noInput}
        editable={false}
        value={"This Cannot Be Edited"}
        theme={{ colors: { text: "white" } }}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
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
    width: "80%",
    alignSelf: "center",
  },
});
