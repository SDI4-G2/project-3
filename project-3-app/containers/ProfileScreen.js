import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import ProfileButton from "../components/ProfileButtons";
import SecondHeaderBar from "../components/SecondHeader";
import Avatar from "../assets/Avatar.png";
import LogOutButton from "../components/LogOutButton";

export default function ProfileScreen({ navigation }) {
  function Logout() {
    SecureStore.deleteItemAsync("token");
    // alert("Logout Successful");
    navigation.navigate("WelcomeScreen");
  }

  return (
    <View>
      <SecondHeaderBar backScreen="Dashboard"></SecondHeaderBar>
      <Image style={styles.avatar} source={Avatar} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.padding}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <ProfileButton naming="Edit Profile"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.padding}
          onPress={() => navigation.navigate("SubscriptionScreen")}
        >
          <ProfileButton naming="Subscription"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.padding}
          onPress={() => navigation.navigate("SupportScreen")}
        >
          <ProfileButton naming="Help and Support"></ProfileButton>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={Logout} style={styles.paddingButton}>
        <LogOutButton naming="Log Out"></LogOutButton>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "5%",
  },
  padding: {
    padding: 5,
    top: "5%",
  },
  avatar: {
    alignSelf: "center",
    top: "0%",
  },
  paddingButton: {
    padding: "5%",
    top: 80,
  },
});
