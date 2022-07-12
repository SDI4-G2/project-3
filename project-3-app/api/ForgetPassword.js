import * as SecureStore from "expo-secure-store";

export default async function ForgetPassword({
  email,

  navigation,
}) {
  return await fetch("https://sdi4-g2.herokuapp.com/forgotpw", {
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
        return serverResponse.message;
        // console.log(serverResponse.message);
      }
    })
    .catch((err) => {
      console.log("2");
      alert("Please enter a valid email");
    });
}
