import { React, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SecondHeaderBar from "../components/SecondHeader";
import { useFonts } from "expo-font";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import { Poppins_300Light } from "@expo-google-fonts/poppins";

export default function SupportScreen() {
  const [currentIndex, setCurrentIndex] = useState();

  const FaqData = [
    {
      question: "About This App",
      answer:
        "This is a freemium app - subscribe to have access to all videos and articles. ",
    },
    {
      question: "Can I Cancel My Subscription?",
      answer:
        "Yes you can. Head on to 'Subscription' under your profile page to cancel anytime.",
    },
    {
      question: "How Do I Change My Username / Password?",
      answer: "Head over to your profile page and select 'Edit Profile'.",
    },
    {
      question: "Can I Change My Email Address?",
      answer:
        "Unfortunately, the email you've signed up with can't be changed.",
    },
    {
      question: "Can I Save Videos?",
      answer:
        "Yes you can. You can bookmark videos or articles you like for ease of viewing.",
    },
  ];

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <SecondHeaderBar backScreen="ProfileScreen"></SecondHeaderBar>
        {FaqData.map(({ question, answer }, index) => {
          return (
            <TouchableOpacity
              key={question}
              onPress={() => {
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              style={styles.cardContainer}
              activeOpacity={0.9}
            >
              <View style={styles.card}>
                <Text style={styles.heading}>{question}</Text>
                {index === currentIndex && (
                  <View style={styles.answerList}>
                    <Text key={answer} style={styles.body}>
                      {answer}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(102, 112, 128, 0.4)",
    borderRadius: 18,
    margin: 15,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 15,
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    lineHeight: 18 * 1.5,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_300Light",
  },
  answerList: {
    margin: 15,
  },
});
