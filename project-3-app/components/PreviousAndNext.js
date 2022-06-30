import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";

import arrow from "../assets/arrow.png";

export default function PreviousAndNext({ wording }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={{ flexDirection: "row", alignSelf: "center" }}>
          <Image
            source={arrow}
            style={{
              transform: [{ rotateY: "180deg" }],
              opacity: 0.6,
            }}
          />
          <View
            style={{
              justifyContent: "center",

              width: 70,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Poppins_300Light",
              }}
            >
              Previous {wording}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",

              width: 70,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.8)",
                textAlign: "left",

                fontFamily: "Poppins_300Light",
                alignSelf: "flex-end",
              }}
            >
              Next {wording}
            </Text>
          </View>
          <Image source={arrow} style={{ opacity: 0.6 }} />
        </TouchableOpacity>
      </View>
    );
}
