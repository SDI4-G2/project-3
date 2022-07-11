import { StyleSheet, Text, View, ScrollView, ImageBackground, RefreshControl, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Headers from '../components/Headers';
import Small from '../assets/Poppins_Small';
import { PulseIndicator } from 'react-native-indicators';

export default function LibraryScreen({ navigation }) {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [list, setList] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);

  async function fetch_all_category() {
    let result = await SecureStore.getItemAsync('token');

    const response = await fetch('https://sdi4-g2.herokuapp.com/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
    });
    const list = await response.json();
    // console.log(list.data);
    setCategory(list.data);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch_all_category();
    }, 1000);
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  return (
    <ScrollView>
      <Headers />
      <View style={styles.container}>
        <View style={{ paddingTop: '5%' }}></View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ paddingTop: '5%' }}></View>
          <ScrollView
            vertical={true}
            // contentContainerStyle={{
            //   justifyContent: "center",
            //   flexDirection: "column",
            //   borderWidth: 3,
            //   borderColor: "white",
            // }}
          >
            {isLoading === true && <PulseIndicator color={'rgba(255,255,255,0.5)'} />}
            {category.map((item) => {
              return (
                <Card
                  style={styles.cardDashboard}
                  key={item.categoryid}
                  onPress={() => {
                    navigation.navigate('Search', { params: { description: item.description } });
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
                        {item.description}
                      </Text>
                    </Card.Content>
                  </ImageBackground>
                </Card>
              );
            })}
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
    width: 150,
    height: 150,
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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
