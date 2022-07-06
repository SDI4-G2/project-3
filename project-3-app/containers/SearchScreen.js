import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { React, useState } from "react";
import { TextInput } from "react-native-paper";
import { Card, Title } from "react-native-paper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OctiIcons from "react-native-vector-icons/Octicons";
import HeaderBar from "../components/Headers";
import Small from "../assets/Poppins_Small";

import { PulseIndicator } from "react-native-indicators";

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View>
      <HeaderBar />
      <View style={{ width: "70%", alignSelf: "center", top: "10%" }}>
        {/* <Text style={{ color: "rgba(255,255,255, 0.7)" }}>Search</Text> */}
        <TouchableOpacity style={styles.textContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            spellCheck={false}
            autoCorrect={false}
            // onChangeText={(text) => validate(text)}
            style={[styles.userInput]}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="search"
            autoFocus={true}
            theme={{
              colors: {
                text: "rgba(255, 255, 255, 0.6)",
              },
            }}
            right={
              <TextInput.Icon
                name={() => (
                  <OctiIcons
                    name={"search"}
                    size={20}
                    color={"rgba(255,255,255,0.5)"}
                  />
                )}
              />
            }
          ></TextInput>
        </TouchableOpacity>

        <View style={{ marginBottom: 20 }}>
          <View style={{ paddingTop: "5%" }}>
            <Small fontSmall={"Videos"}></Small>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {isLoading === true && (
              <PulseIndicator color={"rgba(255,255,255,0.5)"} />
            )}
            {/* {videos.map((item) => {
              return ( */}
            <Card
              style={styles.cardDashboard}
              //   key={item.videoid}
              //   onPress={() => {
              //     navigation.navigate("VideoScreen", {
              //       videoid: item.videoid,
              //     });
              //   }}
            >
              {/* <ImageBackground
                    source={{ uri: item.thumbnails }}
                    // source={{ uri: item.thumb }}
                    style={styles.cardImage}
                    imageStyle={{
                      borderRadius: 15,
                      opacity: 0.5,
                      backgroundColor: "#000",
                    }}
                    onLoadEnd={() => setIsLoading(false)}
                  > */}
              <Card.Content>
                <Text style={styles.cardText} numberOfLines={1}>
                  {/* {item.Category.description} */}Category
                </Text>
                <Title style={styles.cardTitle} numberOfLines={3}>
                  {/* {item.title} */} test
                </Title>
                {/* <Progress.Circle
                        progress={0.4}
                        size={50}
                        indeterminate={false}
                        thickness={12}
                        strokeCap="round"
                        borderWidth={0}
                        unfilledColor="#0F0E47"
                        color="teal"
                        style={{ alignSelf: "center", padding: 10 }}
                      /> */}
              </Card.Content>
              {/* </ImageBackground> */}
            </Card>
            {/* ); */}
            {/* })} */}
          </ScrollView>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Small fontSmall={"Articles"}></Small>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {isLoading === true && (
              <PulseIndicator color={"rgba(255,255,255,0.5)"} />
            )}
            {/* {articles.map((item, index) => ( */}
            <Card
              style={styles.cardDashboard}
              // key={item.articleid}
              // onPress={() => {
              //   navigation.navigate("ArticleScreen", {
              //     articleid: item.articleid,
              //   });
              // }}
            >
              {/* <ImageBackground
                  resizeMode="stretch"
                  source={{ uri: item.url }}
                  style={styles.cardImage}
                  imageStyle={{
                    borderRadius: 15,
                    opacity: 0.5,
                    backgroundColor: "#000",
                  }}
                  onLoadEnd={() => setIsLoading(false)}
                > */}
              <Card.Content>
                <Title style={styles.cardTitle}>
                  {/* {item.Category.description} */} testing
                </Title>
                {/* <Progress.Circle
                      progress={0.8}
                      size={50}
                      indeterminate={false}
                      thickness={12}
                      strokeCap="round"
                      borderWidth={0}
                      unfilledColor="#0F0E47"
                      color="teal"
                      style={{ alignSelf: "center", padding: 10 }}
                    /> */}
              </Card.Content>
              {/* </ImageBackground> */}
            </Card>
            {/* ))} */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    overflow: "hidden",
    height: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  userInput: {
    height: 40,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    color: "rgba(255,255,255,0.7)",
  },
});
