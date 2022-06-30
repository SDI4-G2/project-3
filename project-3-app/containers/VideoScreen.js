import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, useWindowDimensions, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import { useFonts } from 'expo-font';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import HeaderBar from '../components/Headers';
import PreviousButton from '../components/PreviousButton';
import NextButton from '../components/NextButton';

import GetVideo from '../api/GetVideo';

export default function VideoScreen({ navigation, route, wording }) {
  const [videos, setVideos] = useState(null);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [list, setList] = useState(undefined);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const [endOfFrontLine, setEndOfFrontLine] = useState(false);
  const [endOfEndLine, setEndOfEndLine] = useState(false);
  const { videoid, url } = route.params;

  async function get() {
    const videos = await GetVideo();
    setVideos(videos);
    let newList = videos.filter((vid) => {
      return vid.videoid === videoid;
    });
    setList(newList[0].url);
    setTitle(newList[0].title);
    setText(newList[0].text);
    setCurrentVideo(newList[0].videoid);
  }

  function endOfLineCheck() {
    if (videos) {
      let last = videos.length - 1;
      if (currentVideo === videos[0].videoid && currentVideo === videos[last].videoid) {
        setEndOfFrontLine(true);
        setEndOfEndLine(true);
      } else if (currentVideo === videos[0].videoid) {
        setEndOfFrontLine(true);
      } else if (currentVideo === videos[last].videoid) {
        setEndOfEndLine(true);
      } else {
        setEndOfFrontLine(false);
        setEndOfEndLine(false);
      }
    }
  }

  function prevVideo() {
    try {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].videoid === currentVideo) {
          setList(videos[i - 1].url);
          setCurrentVideo(videos[i - 1].videoid);
          setTitle(videos[i - 1].title);
          setText(videos[i - 1].text);
          endOfLineCheck();
          console.log(title);
        }
      }
    } catch (err) {
      alert('Unable to previous' + err);
    }
  }

  function nextVideo() {
    try {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].videoid === currentVideo) {
          setList(videos[i + 1].url);
          setCurrentVideo(videos[i + 1].videoid);
          setTitle(videos[i + 1].title);
          setText(videos[i + 1].text);
          endOfLineCheck();
        }
      }
    } catch (err) {
      console.log('Unable to next' + err);
    }
  }

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    endOfLineCheck();
  });

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const { width } = useWindowDimensions();

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView>
        <HeaderBar></HeaderBar>
        <View style={styles.container}>
          <RenderHTML
            contentWidth={width - 52}
            renderers={renderers}
            WebView={WebView}
            source={{
              html: `<iframe width="400" height="200" src=${list}></iframe>`,
            }}
            customHTMLElementModels={customHTMLElementModels}
          />
        </View>

        <ScrollView style={styles.border}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 40,
          }}
        >
          <TouchableOpacity onPress={() => prevVideo()} disabled={endOfFrontLine === true} style={endOfFrontLine ? styles.disabled : null}>
            <PreviousButton wording={'Video'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextVideo()} disabled={endOfEndLine === true} style={endOfEndLine ? styles.disabled : null}>
            <NextButton wording={'Video'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 6,
    borderColor: 'rgba(102, 112, 128, 0.4)',
    borderRadius: 18,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: '40%',
    width: '90%',
    alignSelf: 'center',
    top: '5%',
  },
  text: {
    textAlign: 'left',
    fontFamily: 'Poppins_300Light',
    color: 'white',
    opacity: 0.7,
    paddingTop: StatusBar.currentHeight,
    fontSize: 15,
    paddingHorizontal: 10,
    lineHeight: 30,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    color: 'white',
    opacity: 0.7,
    paddingTop: StatusBar.currentHeight,
    fontSize: 17,
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  disabled: {
    opacity: 0.3,
  },
});
