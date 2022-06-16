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

import GetVideo from "../api/GetVideo";

export default function VideoScreen({ navigation, route }) {
  const [list, setList] = useState(undefined);
  const { videoid, url } = route.params;

  async function get() {
    const videos = await GetVideo();
    let newList = videos.filter((vid) => {
      return vid.videoid === videoid;
    });
    setList(newList[0].url);
    // console.log(list);
  }

  useEffect(() => {
    get();
  }, []);

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
          <Text style={styles.title}>About The Video</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a massa
            enim. Sed arcu erat, facilisis a libero at, ultricies sagittis orci.
            Nam consectetur cursus tellus. Proin commodo, velit eu dignissim
            mollis, diam justo feugiat mauris, sed imperdiet tortor nibh ornare
            ex. Aenean vehicula dui et pellentesque mollis. Aenean ac elementum
            lectus. Suspendisse accumsan, ex sit amet ornare rhoncus, lorem nisl
            placerat quam, vel lacinia dui orci eu ante. Vivamus vestibulum urna
            nisi, quis dignissim orci suscipit rutrum. Praesent sodales nulla
            vitae tortor vestibulum consequat eu ut felis. Ut tincidunt dolor
            quis elit molestie tincidunt. Quisque feugiat condimentum orci non
            consectetur. Praesent fermentum leo eu mi dignissim posuere.
            Curabitur nec neque eget lacus molestie auctor eget ac quam. Vivamus
            vestibulum semper elit, ac laoreet mauris viverra vel. Nam nec
            ligula rutrum, vestibulum nibh a, blandit nisi. Pellentesque
            consequat erat eu mauris blandit, sed commodo massa tempor. Quisque
            facilisis nunc id elementum pulvinar. Nullam finibus consectetur
            nibh a condimentum. Quisque sit amet rhoncus tortor, at vestibulum
            purus. Nam et odio id erat rutrum faucibus. Sed in gravida velit.
            Pellentesque pretium dolor ante, et pretium tellus accumsan id.
            Etiam vel finibus tellus. Vivamus et tristique tellus. Curabitur
            interdum orci nulla, at egestas lacus elementum at. Nunc hendrerit
            mollis risus, vel aliquam tortor hendrerit in. Integer convallis
            enim orci, eget ullamcorper erat viverra sed. Sed et nibh quis mi
            semper condimentum. Nulla at mollis lorem. Nulla facilisi. Sed vel
            facilisis felis. Praesent id ligula rhoncus, sagittis magna
            pharetra, posuere est. Nulla fermentum molestie ex, vel posuere
            lectus fringilla in. Fusce rhoncus erat sit amet commodo hendrerit.
            Integer sollicitudin interdum felis, nec accumsan leo tincidunt
            vitae. Nam id lectus magna. Aliquam id venenatis orci. Praesent
            finibus mi bibendum, rhoncus felis vel, iaculis purus. Integer
            aliquam eros nunc, a posuere nibh pulvinar a.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 6,
    borderColor: "rgba(102, 112, 128, 0.4)",
    borderRadius: 18,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  border: {
    borderWidth: 3,
    borderColor: "rgba(102, 112, 128, 0.4)",
    borderRadius: 18,
    backgroundColor: "rgba(27, 27, 54, 0.3)",
    height: "40%",
    width: "90%",
    alignSelf: "center",
    top: "5%",
  },
  text: {
    textAlign: "left",
    fontFamily: "Poppins_300Light",
    color: "white",
    opacity: 0.7,
    paddingTop: StatusBar.currentHeight,
    fontSize: 15,
    paddingHorizontal: 10,
    lineHeight: 30,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    opacity: 0.7,
    paddingTop: StatusBar.currentHeight,
    fontSize: 17,
    paddingHorizontal: 10,
    textAlign: "left",
  },
});
