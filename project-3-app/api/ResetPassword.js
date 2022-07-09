import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

//work in progress

export default async function ResetPassword({
  email,
  password,
  confirmPassword,
  navigation,
}) {
  return await fetch("https://sdi4-g2.herokuapp.com/resetpw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      if (serverResponse.data) {
        // console.log(serverResponse.data);
        navigation.navigate("ResetPwSuccessScreen");
      } else {
        return "Passwords do not match. Please try again.";
        // console.log(serverResponse.message)
      }
    })
    .catch((err) => {
      alert("Error occured, please try again");
    });
}
