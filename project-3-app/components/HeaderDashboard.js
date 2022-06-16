import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { Header } from "@rneui/themed";
import profileIcon from "../assets/profileicon.png";
import arrow from "../assets/chevron-left.png";
import { useNavigation } from "@react-navigation/native";
import Med from "../assets/Poppins_Medium";

export default function HeaderDashboard({user_name, email}) {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View style={{width: 250, marginTop: 10}}>
          <Text style={styles.bigText}>Hi, {(user_name != null ? user_name:email)}!</Text>
        </View>
      }
      rightComponent={
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image source={profileIcon} />
          </TouchableOpacity>
        </View>
      }
      containerStyle={{
        flex: 1,
        backgroundColor: "transparent",
        borderBottomWidth: 0,
      }}
    ></Header>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontWeight: "400",
    fontSize: 25,
    lineHeight: 30,
    display: "flex",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
});
