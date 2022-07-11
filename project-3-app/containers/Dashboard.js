import { StyleSheet, Text, View, ScrollView, ImageBackground, RefreshControl, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Jwt from '../api/Jwt';
import HeaderDashboard from '../components/HeaderDashboard';
import Small from '../assets/Poppins_Small';

import { PulseIndicator } from 'react-native-indicators';
import books from '../assets/books.png';
// import * as Progress from "react-native-progress";

export default function Dashboard({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getJwt() {
    const list = await Jwt();
  }

  async function fetch_all_videos() {
    let result = await SecureStore.getItemAsync('token');

    const response = await fetch('https://sdi4-g2.herokuapp.com/video', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
    });
    const list = await response.json();
    // console.log(list.data);
    setVideos(list.data);
  }

  async function fetch_all_articles() {
    let result = await SecureStore.getItemAsync('token');

    const response = await fetch('https://sdi4-g2.herokuapp.com/article', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
    });
    const list = await response.json();
    // console.log(list.data);
    setArticles(list.data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getJwt();
      fetch_all_videos();
      fetch_all_articles();
    }, 1000);
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <HeaderDashboard />
      <View style={styles.container}>
        <View style={{ paddingTop: '5%' }}>
          <Small fontSmall="Let's get started" />
        </View>
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
            {videos.map((item) => {
              return (
                <Card
                  style={styles.cardDashboard}
                  key={item.videoid}
                  onPress={() => {
                    navigation.navigate('VideoScreen', {
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
                      backgroundColor: '#000',
                    }}
                    onLoadEnd={() => setIsLoading(false)}
                  >
                    <Card.Content>
                      <Text style={styles.cardText} numberOfLines={1}>
                        {item.Category.description}
                      </Text>
                      <Title style={styles.cardTitle} numberOfLines={3}>
                        {item.title}
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
                  </ImageBackground>
                </Card>
              );
            })}
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
            {articles.map((item, index) => (
              <Card
                style={styles.cardDashboard}
                key={item.articleid}
                onPress={() => {
                  navigation.navigate('ArticleScreen', {
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
                    backgroundColor: '#000',
                  }}
                  onLoadEnd={() => setIsLoading(false)}
                >
                  <Card.Content>
                    <Text style={styles.cardText} numberOfLines={1}>
                      {item.Category.description}
                    </Text>
                    <Title style={styles.cardTitle} numberOfLines={3}>
                      {item.title}
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
                </ImageBackground>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 60, //StatusBar.currentHeight,
    padding: 15,
    bottom: 35,
  },
  mediumText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 30,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardDashboard: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    borderColor: 'rgba(102, 112, 128, 0.3)',
    borderRadius: 15,
    backgroundColor: '#d2d5db',
    borderWidth: 1,
    fontWeight: 700,
  },
  cardTitle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    display: 'flex',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardText: {
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 30,
    display: 'flex',
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
