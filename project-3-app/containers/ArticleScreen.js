import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import HeaderBar from "../components/Headers";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import MedCenter from "../assets/Poppins_CenterTitle";
import dogPic from "../assets/Rectangle1436.png";
import Small from "../assets/Poppins_Small";
import bitcoinPic from "../assets/bitcoin3.5.png";

export default function VideoScreen() {
  return (
    <View>
      <HeaderBar />
      <ScrollView>
        <View style={styles.card}>
          <Card style={styles.background}>
            <View>
              <Image source={bitcoinPic} style={styles.image} />
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  alignSelf: "center",
                  height: "100%",
                  justifyContent: "center",
                  maxWidth: "85%",
                  //   borderWidth: 3,
                  opacity: 0.5,
                }}
              >
                <MedCenter
                  fontMedCenter={"Bitcoin Thief Resort to Stealing Pencils"}
                />
              </View>
            </View>

            <Card.Content>
              <Paragraph style={styles.content}>
                <Small
                  fontSmall="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                massa enim. Sed arcu erat, facilisis a libero at, ultricies
                sagittis orci. Nam consectetur cursus tellus. Proin commodo,
                velit eu dignissim mollis
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                massa enim. Sed arcu erat, facilisis a libero at, ultricies
                sagittis orci. Nam consectetur cursus tellus. Proin commodo,
                velit eu dignissim mollis, diam justo feugiat mauris, sed
                imperdiet tortor nibh ornare ex. Aenean vehicula dui et
                pellentesque mollis. Aenean ac elementum lectus. Suspendisse
                accumsan, ex sit amet ornare rhoncus, lorem nisl placerat quam,
                vel lacinia dui orci eu ante. Vivamus vestibulum urna nisi, quis
                dignissim orci suscipit rutrum. Praesent sodales nulla vitae
                tortor vestibulum consequat eu ut felis. Ut tincidunt dolor quis
                elit molestie tincidunt. Quisque feugiat condimentum orci non
                consectetur. Praesent fermentum leo eu mi dignissim posuere.
                Curabitur nec neque eget lacus molestie auctor eget ac quam.
                Vivamus vestibulum semper elit, ac laoreet mauris viverra vel.
                Nam nec ligula rutrum, vestibulum nibh a, blandit nisi.
                Pellentesque consequat erat eu mauris blandit, sed commodo massa
                tempor. Quisque facilisis nunc id elementum pulvinar."
                />
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    width: "85%",
    alignSelf: "center",

    overflow: "hidden",
    paddingBottom: "30%",
  },
  background: {
    backgroundColor: "rgba(89,60,21, 0.3)",
    borderRadius: 30,
  },

  content: {
    padding: "5%",

    lineHeight: 30,
  },
  image: {
    borderRadius: 30,
    alignSelf: "center",
    overflow: "hidden",
    opacity: 0.7,
    width: "100%",
  },
});
