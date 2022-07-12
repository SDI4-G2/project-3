import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Headers from "../components/Headers";
import Bold from "../assets/Poppins_Bold";
import { PulseIndicator } from "react-native-indicators";
import { useFocusEffect } from "@react-navigation/native";

export default function LibraryScreen({ navigation }) {
  const [category, setCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function fetch_all_category() {
    let result = await SecureStore.getItemAsync("token");

    const response = await fetch("https://sdi4-g2.herokuapp.com/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + result,
      },
    });
    const list = await response.json();
    // console.log(list.data);
    setCategory(list.data);
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetch_all_category();
  //   }, 1000);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetch_all_category();
    }, [])
  );

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  return (
    <View>
      <Headers />
      <View style={{ width: "80%", alignSelf: "center", top: "0%" }}>
        <View>
          <Bold fontBold={"Library"}></Bold>
        </View>
        <View>
          {isLoading === true && (
            <PulseIndicator color={"rgba(255,255,255,0.5)"} />
          )}
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <FlatList
              data={category}
              numColumns={2}
              horizontal={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SubMainScreen", {
                      params: { description: item.description },
                    });
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <ImageBackground
                      source={{ uri: item.thumbnails }}
                      style={styles.cardImage}
                      imageStyle={{
                        borderRadius: 15,
                        opacity: 0.5,
                      }}
                      onLoadEnd={() => setIsLoading(false)}
                    >
                      <View style={styles.cardDashboard}>
                        <Text style={styles.cardTitle}>{item.description}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardDashboard: {
    width: 150,
    height: 150,
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  cardTitle: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    alignSelf: "center",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },

  cardImage: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
