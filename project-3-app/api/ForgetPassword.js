import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

//work in progress

export default async function ForgetPassword({
  email,

  navigation,
}) {
  await fetch("https://sdi4-g2.herokuapp.com/forgotpw", {
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
        SecureStore.setItemAsync("tokenForgotPw", serverResponse.data);
        // console.log(serverResponse);

        navigation.push("VerificationScreen");
      } else {
        alert(
          "Please enter a valid email"
          // [
          //   {
          //     text: "OK",
          //   }
          // ]
        );
      }
    })
    .catch((err) => {
      alert("Please enter a valid email");
    });
}
