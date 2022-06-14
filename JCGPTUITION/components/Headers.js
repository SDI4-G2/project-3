import { TouchableOpacity, Text, View, Image } from "react-native";
import { Header } from "@rneui/themed";
import profileIcon from "../assets/profileicon.png";
import arrow from "../assets/chevron-left.png";

export default function HeaderBar() {
  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View>
          <TouchableOpacity>
            <Image source={arrow} />
          </TouchableOpacity>
        </View>
      }
      rightComponent={
        <View>
          <TouchableOpacity>
            <Image source={profileIcon} />
          </TouchableOpacity>
        </View>
      }
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomWidth: 0,
      }}
    ></Header>
  );
}
