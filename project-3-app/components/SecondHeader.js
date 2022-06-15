import { TouchableOpacity, Text, View, Image } from "react-native";
import { Header } from "@rneui/themed";
import profileIcon from "../assets/profileicon.png";
import arrow from "../assets/chevron-left.png";
import { useNavigation } from "@react-navigation/native";

export default function SecondHeaderBar() {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrow} />
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
