import { TouchableOpacity, Text, View, Image } from "react-native";
import { Header } from "@rneui/themed";
import profileIcon from "../assets/profileicon.png";
import arrow from "../assets/chevron-left.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";

import Jwt from "../api/Jwt";

export default function HeaderBar() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);

  async function getJwt() {
    const list = await Jwt();
    let username = list.username.slice(0, 2);
    return setUserData(username);
  }

  async function expiryTimeout() {
    const list = await Jwt();
    const time = new Date().getTime() / 1000;
    // console.log('jwt:' + list.exp, 'time' + time);
    if (list.exp < time) {
      alert("Login timeout. Please login again.");
      navigation.navigate("WelcomeScreen");
    }
  }
  expiryTimeout();

  useEffect(() => {
    getJwt();
  }, []);

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
      rightComponent={
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            {/* <Image source={profileIcon} /> */}
            <View style={{ alignItems: "center" }}>
              <Avatar.Text
                size={35}
                label={userData}
                backgroundColor="rgba(255,255,255,0.1)"
                color="rgba(255,255,255,0.6)"
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              />
            </View>
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
