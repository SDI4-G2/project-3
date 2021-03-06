import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Keyboard,
  Pressable,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Card, Title } from "react-native-paper";
import Small from "../assets/Poppins_Small";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import Bold from "../assets/Poppins_Bold";
import { PulseIndicator } from "react-native-indicators";

import GetVideo from "../api/GetVideo";
import GetArticle from "../api/GetArticle";
import HeaderBar from "../components/Headers";

export default function SubMainScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  const [search, setSearch] = useState("");

  const [vidResult, setVidResult] = useState([]);
  const [artResult, setArtResult] = useState([]);
  const description = route.params;

  async function get() {
    const video = await GetVideo();
    const article = await GetArticle();
    for (let i = 0; i < video.length; i++) {
      let vid = video[i];
      for (var key in vid) {
        if (key !== "Category" && vid.Category) {
          vid.Category[key] = vid[key];
        }
      }
      video[i] = vid.Category || vid;
    }
    for (let i = 0; i < article.length; i++) {
      let art = article[i];
      for (var key in art) {
        if (key !== "Category" && art.Category) {
          art.Category[key] = art[key];
        }
      }
      article[i] = art.Category || art;
    }
    setVideos(video);
    setArticles(article);
  }

  function textSearch() {
    const vid = videos;
    const art = articles;
    const keys = ["description", "text", "title"];
    const values = [search];
    const regex = new RegExp(values, "i");

    const filteredVid = vid.filter((e) => {
      return keys.some(function (a) {
        return regex.test(e[a]);
      });
    });
    setVidResult(filteredVid);

    const filteredArt = art.filter((e) => {
      return keys.some(function (a) {
        return regex.test(e[a]);
      });
    });
    setArtResult(filteredArt);
    // console.log(search);
  }

  function passSearch() {
    if (description) {
      setSearch(description.params.description);
    }
  }

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      textSearch();
    }, 10);
  }, [search, videos, articles]);

  useEffect(() => {
    passSearch();
  }, [description]);
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        <Pressable onPress={Keyboard.dismiss}>
          <HeaderBar />

          <View style={{ width: "80%", alignSelf: "center", top: "0%" }}>
            <View>
              <Bold fontBold={search}></Bold>
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
                  {vidResult.map((item) => {
                    return (
                      <Card
                        style={styles.cardDashboard}
                        key={item.videoid}
                        onPress={() => {
                          navigation.navigate("VideoScreen", {
                            videoid: item.videoid,
                          });
                        }}
                      >
                        <ImageBackground
                          source={{ uri: item.thumbnails }}
                          // source={{ uri: item.thumb }}
                          style={styles.cardImage}
                          imageStyle={{
                            borderRadius: 15,
                            opacity: 0.5,
                            backgroundColor: "#000",
                          }}
                          onLoadEnd={() => setIsLoading(false)}
                        >
                          <Card.Content>
                            <Text style={styles.cardText} numberOfLines={1}>
                              {item.description}
                            </Text>
                            <Title style={styles.cardTitle} numberOfLines={3}>
                              {item.title}
                            </Title>
                          </Card.Content>
                        </ImageBackground>
                      </Card>
                    );
                  })}
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
                  {artResult.map((item, index) => (
                    <Card
                      style={styles.cardDashboard}
                      key={item.articleid}
                      onPress={() => {
                        navigation.navigate("ArticleScreen", {
                          articleid: item.articleid,
                        });
                      }}
                    >
                      <ImageBackground
                        resizeMode="stretch"
                        source={{ uri: item.thumbnails }}
                        style={styles.cardImage}
                        imageStyle={{
                          borderRadius: 15,
                          opacity: 0.5,
                          backgroundColor: "#000",
                        }}
                        onLoadEnd={() => setIsLoading(false)}
                      >
                        <Card.Content>
                          <Title style={styles.cardText}>
                            {item.description}
                          </Title>
                          <Title style={styles.cardTitle} numberOfLines={3}>
                            {item.title}
                          </Title>
                        </Card.Content>
                      </ImageBackground>
                    </Card>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Pressable>
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
  cardDashboard: {
    width: 120,
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    borderColor: "rgba(102, 112, 128, 0.3)",
    borderRadius: 15,
    backgroundColor: "#d2d5db",
    borderWidth: 1,
    fontWeight: 700,
  },
  cardTitle: {
    fontStyle: "normal",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 20,
    display: "flex",
    alignSelf: "center",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
  cardText: {
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 30,
    display: "flex",
    alignSelf: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
  cardImage: {
    width: 120,
    height: 120,
  },
});
