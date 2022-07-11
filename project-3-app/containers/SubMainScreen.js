import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import { React, useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Card, Title } from "react-native-paper";
import { StackActions, TabRouter } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OctiIcons from "react-native-vector-icons/Octicons";
import HeaderBar from "../components/Headers";
import Small from "../assets/Poppins_Small";
import searchIcon from "../assets/searchIcon.png";
import Med from "../assets/Poppins_Medium";
import { CommonActions } from "@react-navigation/native";

import { PulseIndicator } from "react-native-indicators";

import GetVideo from "../api/GetVideo";
import GetArticle from "../api/GetArticle";
import GetCategory from "../api/GetCategory";

export default function SubMainScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState([]);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState([]);
  const [vidResult, setVidResult] = useState([]);
  const [artResult, setArtResult] = useState([]);
  const [list, setList] = useState([]);
  const { title } = route.params;

  async function get() {
    const video = await GetVideo();

    // let newList = video.map((vid) => {
    //   return vid.categoryid;
    // });
    // console.log(newList);

    // setList(newList.url);

    const article = await GetArticle();
    // let newList2 = article.filter((art) => {
    //   return art.articleid;
    // });
    // console.log(newList2);

    // setList(newList2.url);
    const category = await GetCategory();

    // for (let i = 0; i < video.length; i++) {
    //   let vid = video[i];
    //   for (var key in vid) {
    //     if (key !== "Category" && vid.Category) {
    //       vid.Category[key] = vid[key];
    //     }
    //   }
    //   video[i] = vid.Category || vid;
    // }
    // for (let i = 0; i < article.length; i++) {
    //   let art = article[i];
    //   for (var key in art) {
    //     if (key !== "Category" && art.Category) {
    //       art.Category[key] = art[key];
    //     }
    //   }
    //   article[i] = art.Category || art;
    // }
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
    // console.log(filteredVid);

    const filteredArt = art.filter((e) => {
      return keys.some(function (a) {
        return regex.test(e[a]);
      });
    });

    setArtResult(filteredArt);
    // console.log(filteredArt)
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <View style={{ top: 40 }}>
      <Text style={{ color: "white" }}>hello {route.params.title}</Text>
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
