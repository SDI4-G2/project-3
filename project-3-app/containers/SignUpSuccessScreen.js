import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import anotherStar from "../assets/anotherStarSeven.png";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import ButtonsOne from "../components/Buttons";

export default function SignUpSuccessScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        {/* <HeaderBar /> */}

        <View style={{ top: "15%", width: "80%", alignSelf: "center" }}>
          <Image
            source={anotherStar}
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
            }}
          />

          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Poppins_500Medium",
              fontSize: 45,
              textAlign: "center",
            }}
          >
            Hurray!
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              textAlign: "left",

              fontFamily: "Poppins_300Light",

              fontSize: 15,
            }}
          >
            You have created an account with us!
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              textAlign: "left",
              //   alignSelf: "center",
              fontFamily: "Poppins_300Light",

              fontSize: 15,
            }}
          >
            Log in and start your new learning journey right away.
          </Text>
          <TouchableOpacity
            style={{ top: "10%" }}
            onPress={() => navigation.push("WelcomeScreen")}
          >
            <ButtonsOne naming={"Log In"} />
          </TouchableOpacity>
        </View>
      </View>
    );
}
