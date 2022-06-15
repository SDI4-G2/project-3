import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button } from 'react-native';

import GetVideo from '../api/GetVideo';

export default function VideoScreen() {
  const [list, setList] = useState(undefined);

  async function get() {
    const videos = await GetVideo();
    setList(videos);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <View>
      <Button title="Press" onPress={get}></Button>
      <Text>{list}</Text>
    </View>
  );
}
