import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import { React, useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { Card, Title } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OctiIcons from 'react-native-vector-icons/Octicons';
import HeaderBar from '../components/Headers';
import Small from '../assets/Poppins_Small';

import { PulseIndicator } from 'react-native-indicators';

import GetVideo from '../api/GetVideo';
import GetArticle from '../api/GetArticle';

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState([]);
  const [vidResult, setVidResult] = useState([]);
  const [artResult, setArtResult] = useState([]);

  async function get() {
    const video = await GetVideo();
    const article = await GetArticle();
    for (let i = 0; i < video.length; i++) {
      let vid = video[i];
      for (var key in vid) {
        if (key !== 'Category' && vid.Category) {
          vid.Category[key] = vid[key];
        }
      }
      video[i] = vid.Category || vid;
    }
    for (let i = 0; i < article.length; i++) {
      let art = article[i];
      for (var key in art) {
        if (key !== 'Category' && art.Category) {
          art.Category[key] = art[key];
        }
      }
      article[i] = art.Category || art;
    }
    setVideos(video);
    setArticles(article);
  }

  function textSearch() {
    const data = videos;
    const keys = ['description', 'text', 'title'];
    const values = [search];
    const regex = new RegExp(values, 'i');

    const filtereddata = data.filter((e) => {
      return keys.some(function (a) {
        return regex.test(e[a]);
      });
    });

    setVidResult(filtereddata);
    console.log(filtereddata);
    // setVidResult(filtereddata);
    // if (videos.some((o) => regex.test(o.description) || regex.test(o.title) || regex.test(o.text))) {
    //   setVidResult(i);
    //   // console.log(i);
    // } else {
    //   setVidResult('');
    //   // console.log('Null');
    // }

    // for await (const i of articles) {
    //   if (videos.some((o) => regex.test(o.description) || regex.test(o.title) || regex.test(o.text))) {
    //     setArtResult(i);
    //     // console.log(i);
    //   } else {
    //     setArtResult('');
    //     // console.log('Null');
    //   }
    // }
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <View>
      <HeaderBar />
      <View style={{ width: '70%', alignSelf: 'center', top: '10%' }}>
        {/* <Text style={{ color: "rgba(255,255,255, 0.7)" }}>Search</Text> */}
        <TouchableOpacity style={styles.textContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={setSearch}
            style={[styles.userInput]}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="search"
            autoFocus={true}
            theme={{
              colors: {
                text: 'rgba(255, 255, 255, 0.6)',
              },
            }}
            right={
              <TextInput.Icon name={() => <OctiIcons name={'search'} size={20} color={'rgba(255,255,255,0.5)'} onPress={() => textSearch()} />} />
            }
          ></TextInput>
        </TouchableOpacity>
        <Button
          title="Test"
          onPress={() => {
            console.log(vidResult);
          }}
        ></Button>

        <View style={{ marginBottom: 20 }}>
          <View style={{ paddingTop: '5%' }}>
            <Small fontSmall={'Videos'}></Small>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            {isLoading === true && <PulseIndicator color={'rgba(255,255,255,0.5)'} />}
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
          <Small fontSmall={'Articles'}></Small>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            {isLoading === true && <PulseIndicator color={'rgba(255,255,255,0.5)'} />}
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
                <Title style={styles.cardTitle}>{/* {item.Category.description} */} testing</Title>
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
    overflow: 'hidden',
    height: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  userInput: {
    height: 40,
    backgroundColor: 'rgba(255, 255,255, 0.05)',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
    color: 'rgba(255,255,255,0.7)',
  },
});
