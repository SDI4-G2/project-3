import { TouchableOpacity, Text, View, Image } from "react-native";
import ButtonsOne from "../components/Buttons";
import HeaderBar from "../components/Headers";
import arrow from "../assets/chevron-left.png";

export default function SignUpScreen() {
  return (
    <View>
      <HeaderBar />
      <TouchableOpacity
        onPress={() => console.log("Haha I'm about to be a button")}
      >
        <ButtonsOne naming="Sign Up"></ButtonsOne>
      </TouchableOpacity>
    </View>
  );
}
