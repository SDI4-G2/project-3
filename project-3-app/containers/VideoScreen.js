
import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import WebView from "react-native-webview";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import RenderHTML from "react-native-render-html";
import { useFonts } from "expo-font";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import HeaderBar from "../components/Headers";
import PreviousAndNext from "../components/PreviousAndNext";

import GetVideo from '../api/GetVideo';


export default function VideoScreen({ navigation, route, wording }) {

  const [videos, setVideos] = useState(null);

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
          endOfLineCheck();
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
        <Button title="Previous" onPress={() => prevVideo()} disabled={endOfFrontLine === true}></Button>
        <Button title="Next" onPress={() => nextVideo()} disabled={endOfEndLine === true}></Button>
        <ScrollView style={styles.border}>
          <Text style={styles.title}>About The Video</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a massa enim. Sed arcu erat, facilisis a libero at, ultricies sagittis orci.
            Nam consectetur cursus tellus. Proin commodo, velit eu dignissim mollis, diam justo feugiat mauris, sed imperdiet tortor nibh ornare ex.
            Aenean vehicula dui et pellentesque mollis. Aenean ac elementum lectus. Suspendisse accumsan, ex sit amet ornare rhoncus, lorem nisl
            placerat quam, vel lacinia dui orci eu ante. Vivamus vestibulum urna nisi, quis dignissim orci suscipit rutrum. Praesent sodales nulla
            vitae tortor vestibulum consequat eu ut felis. Ut tincidunt dolor quis elit molestie tincidunt. Quisque feugiat condimentum orci non
            consectetur. Praesent fermentum leo eu mi dignissim posuere. Curabitur nec neque eget lacus molestie auctor eget ac quam. Vivamus
            vestibulum semper elit, ac laoreet mauris viverra vel. Nam nec ligula rutrum, vestibulum nibh a, blandit nisi. Pellentesque consequat erat
            eu mauris blandit, sed commodo massa tempor. Quisque facilisis nunc id elementum pulvinar. Nullam finibus consectetur nibh a condimentum.
            Quisque sit amet rhoncus tortor, at vestibulum purus. Nam et odio id erat rutrum faucibus. Sed in gravida velit. Pellentesque pretium
            dolor ante, et pretium tellus accumsan id. Etiam vel finibus tellus. Vivamus et tristique tellus. Curabitur interdum orci nulla, at
            egestas lacus elementum at. Nunc hendrerit mollis risus, vel aliquam tortor hendrerit in. Integer convallis enim orci, eget ullamcorper
            erat viverra sed. Sed et nibh quis mi semper condimentum. Nulla at mollis lorem. Nulla facilisi. Sed vel facilisis felis. Praesent id
            ligula rhoncus, sagittis magna pharetra, posuere est. Nulla fermentum molestie ex, vel posuere lectus fringilla in. Fusce rhoncus erat sit
            amet commodo hendrerit. Integer sollicitudin interdum felis, nec accumsan leo tincidunt vitae. Nam id lectus magna. Aliquam id venenatis
            orci. Praesent finibus mi bibendum, rhoncus felis vel, iaculis purus. Integer aliquam eros nunc, a posuere nibh pulvinar a.
          </Text>
        </ScrollView>
        <View style={{ top: 50 }}>
          <PreviousAndNext wording={"Video"} />
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
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: "40%",
    width: "90%",
    alignSelf: "center",
    top: "5%",

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
});
