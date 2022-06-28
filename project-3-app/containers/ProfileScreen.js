import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import ProfileButton from "../components/ProfileButtons";
import SecondHeaderBar from "../components/SecondHeader";
import Avatar from "../assets/Avatar.png";
import LogOutButton from "../components/LogOutButton";
import editprofile from "../assets/editprofile.png";

export default function ProfileScreen({ navigation }) {
  function Logout() {
    SecureStore.deleteItemAsync("token");
    // alert("Logout Successful");
    navigation.navigate("WelcomeScreen");
  }
  return (
    <View>
      <SecondHeaderBar></SecondHeaderBar>
      <Image style={styles.avatar} source={Avatar} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.padding}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <ProfileButton naming="Edit Profile"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding}>
          <ProfileButton naming="Subscription"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding}>
          <ProfileButton naming="Recently Viewed"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding}>
          <ProfileButton naming="Saved Content"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding}>
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
  },
  avatar: {
    alignSelf: "center",
    top: "0%",
  },
  paddingButton: {
    padding: "5%",
  },
});
