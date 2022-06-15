import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import WebView from 'react-native-webview';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';

import GetVideo from '../api/GetVideo';

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

  return (
    <View>
      <RenderHTML
        renderers={renderers}
        WebView={WebView}
        source={{
          html: `<iframe width="400" height="200" src=${list}></iframe>`,
        }}
        customHTMLElementModels={customHTMLElementModels}
      />
      <Button title="try" onPress={get} />
    </View>
  );
}
