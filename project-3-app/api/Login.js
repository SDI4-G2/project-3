import * as SecureStore from "expo-secure-store";

export default async function Login({ email, username, password, navigation }) {
  return await fetch("https://sdi4-g2.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      if (serverResponse.data) {
        SecureStore.setItemAsync("token", serverResponse.data);
        console.log(serverResponse);
        // alert('Login Successful');
        navigation.navigate("Dashboard");
      } else {
        return serverResponse.message;
      }
    })
    .catch((err) => {
      // alert("Something went wrong. Please try again.");
      return "Something went wrong. Please try again.";
    });
}
