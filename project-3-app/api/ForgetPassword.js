import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

//work in progress

export default async function ForgetPassword({
  email,

  navigation,
}) {
  await fetch("https://sdi4-g2.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      if (serverResponse.data) {
        SecureStore.setItemAsync("token", serverResponse.data);
        // console.log(serverResponse);

        navigation.push("Dashboard");
      } else {
        Alert.alert(
          "Please enter valid email"[
            {
              text: "OK",
            }
          ]
        );
      }
    })
    .catch((err) => {
      alert("Please enter valid email/username and password");
    });
}
