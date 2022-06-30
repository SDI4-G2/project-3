import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import HeaderBar from "../components/Headers";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import MedCenter from "../assets/Poppins_CenterTitle";
import bitcoinPic from "../assets/bitcoin3.5.png";
import PreviousButton from "../components/PreviousButton";
import NextButton from "../components/NextButton";

export default function VideoScreen({ wording }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar />
      <View>
        <View style={styles.card}>
          <Card style={styles.background}>
            <View>
              <Image source={bitcoinPic} style={[styles.image]} />
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  alignSelf: "center",
                  height: "100%",
                  justifyContent: "center",
                  maxWidth: "90%",
                  // borderWidth: 3,
                  opacity: 0.7,
                }}
              >
                <MedCenter
                  fontMedCenter={"Bitcoin Thief Resort to Stealing Pencils"}
                />
              </View>
            </View>

            <Card.Content>
              <ScrollView style={styles.content}>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                  massa enim. Sed arcu erat, facilisis a libero at, ultricies
                  sagittis orci. Nam consectetur cursus tellus. Proin commodo,
                  velit eu dignissim mollis Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. In a massa enim. Sed arcu erat,
                  facilisis a libero at, ultricies sagittis orci. Nam
                  consectetur cursus tellus. Proin commodo, velit eu dignissim
                  mollis, diam justo feugiat mauris, sed imperdiet tortor nibh
                  ornare ex. Aenean vehicula dui et pellentesque mollis. Aenean
                  ac elementum lectus. Suspendisse accumsan, ex sit amet ornare
                  rhoncus, lorem nisl placerat quam, vel lacinia dui orci eu
                  ante. Vivamus vestibulum urna nisi, quis dignissim orci
                  suscipit rutrum. Praesent sodales nulla vitae tortor
                  vestibulum consequat eu ut felis. Ut tincidunt dolor quis elit
                  molestie tincidunt.
                </Text>
              </ScrollView>
            </Card.Content>
          </Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity>
              <PreviousButton wording={"Article"} />
            </TouchableOpacity>
            <TouchableOpacity>
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
    paddingBottom: "30%",
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
    height: "53%",
    width: "100%",
    alignSelf: "center",
  },

  text: {
    textAlign: "left",
    fontFamily: "Poppins_300Light",
    color: "white",
    opacity: 0.7,
    // top: "3%",
    fontSize: 13,
    paddingVertical: 15,
    paddingHorizontal: 15,
    lineHeight: 30,
    // width: "90%",
    alignSelf: "center",
  },

  image: {
    borderRadius: 30,
    alignSelf: "center",
    overflow: "hidden",
    opacity: 1,
    width: "100%",
    height: 200,
  },
});
