import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import HeaderBar from "../components/Headers";
import { Card } from "react-native-paper";
import MedCenter from "../assets/Poppins_CenterTitle";
import PreviousButton from "../components/PreviousButton";
import NextButton from "../components/NextButton";
import { WebView } from "react-native-webview";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import GetArticle from "../api/GetArticle";

const PdfReader = ({ url: uri }) => (
  <WebView style={{ flex: 1 }} source={{ uri }} />
);

export default function ArticleScreen({ route }) {
  const [articles, setArticles] = useState(null);
  const [title, setTitle] = useState(null);
  const [bg, setBg] = useState(null);
  const [list, setList] = useState(undefined);
  const [currentArticle, setCurrentArticle] = useState(undefined);
  const [endOfFrontLine, setEndOfFrontLine] = useState(true);
  const [endOfEndLine, setEndOfEndLine] = useState(true);
  const { articleid, url } = route.params;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  async function get() {
    const articles = await GetArticle();
    setArticles(articles);
    let newList = articles.filter((art) => {
      return art.articleid === articleid;
    });
    setList(newList[0].url);
    setTitle(newList[0].title);
    setBg(newList[0].thumbnails);
    setCurrentArticle(newList[0].articleid);
  }

  function endOfLineCheck() {
    if (articles) {
      let last = articles.length - 1;
      if (
        currentArticle === articles[0].articleid &&
        currentArticle === articles[last].articleid
      ) {
        setEndOfFrontLine(true);
        setEndOfEndLine(true);
      } else if (currentArticle === articles[0].articleid) {
        setEndOfFrontLine(true);
        setEndOfEndLine(false);
      } else if (currentArticle === articles[last].articleid) {
        setEndOfFrontLine(false);
        setEndOfEndLine(true);
      } else {
        setEndOfFrontLine(false);
        setEndOfEndLine(false);
      }
    }
  }

  function prevArticle() {
    try {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].articleid === currentArticle) {
          setList(articles[i - 1].url);
          setCurrentArticle(articles[i - 1].articleid);
          setTitle(articles[i - 1].title);
          setBg(articles[i - 1].thumbnails);
          endOfLineCheck();
          // console.log(title);
        }
      }
    } catch (err) {
      alert("Unable to previous" + err);
    }
  }

  function nextArticle() {
    try {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].articleid === currentArticle) {
          setList(articles[i + 1].url);
          setCurrentArticle(articles[i + 1].articleid);
          setTitle(articles[i + 1].title);
          setBg(articles[i + 1].thumbnails);
          endOfLineCheck();
        }
      }
    } catch (err) {
      console.log("Unable to next" + err);
    }
  }

  function passSearch() {
    if (articleid) {
      get();
    }
  }

  // useEffect(() => {
  //   get();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      get();
    }, [])
  );

  useEffect(() => {
    endOfLineCheck();
  });

  useEffect(() => {
    passSearch();
  }, [articleid]);

  return (
    <View>
      <HeaderBar />
      <View>
        <View style={styles.card}>
          <Card style={styles.background}>
            <View>
              <Image
                source={{ uri: bg }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 30,
                  opacity: 0.55,
                }}
                onLoadEnd={() => setIsLoading(false)}
              />
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  alignSelf: "center",
                  height: "100%",
                  justifyContent: "center",
                  maxWidth: "100%",
                  opacity: 0.7,
                  paddingHorizontal: 8,
                }}
              >
                <MedCenter fontMedCenter={title} />
              </View>
            </View>

            <Card.Content>
              <ScrollView style={styles.content}>
                <View style={{ height: 500, paddingVertical: 15 }}>
                  <PdfReader url={list} />
                </View>
              </ScrollView>
            </Card.Content>
          </Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => prevArticle()}
              disabled={endOfFrontLine === true}
              style={endOfFrontLine ? styles.disabled : null}
            >
              <PreviousButton wording={"Article"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => nextArticle()}
              disabled={endOfEndLine === true}
              style={endOfEndLine ? styles.disabled : null}
            >
              <NextButton wording={"Article"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    paddingBottom: "50%",
  },
  background: {
    backgroundColor: "rgba(89,60,21, 0.3)",
    borderRadius: 25,
    borderColor: "rgba(89,60,21, 0.5)",
    width: "80%",
    alignSelf: "center",
  },

  content: {
    borderRadius: 30,
    height: "49%",
    width: "100%",
    alignSelf: "center",
  },
  disabled: {
    opacity: 0.3,
  },
});
