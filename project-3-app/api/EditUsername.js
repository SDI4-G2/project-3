import * as SecureStore from "expo-secure-store";

export default async function EditUsername({
  email,
  username,
  password,
  navigation,
}) {
  return await fetch("https://sdi4-g2.herokuapp.com/editusername", {
    method: "PUT",
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
    .then((res) => {
      if (res.data) {
        // alert(res.data);
        res.data;
        SecureStore.setItemAsync("token", res.data);
        return false;
      } else {
        alert(` ${res.message}`);
        // res.message;
        // return true;
        return true;
      }
    })
    .catch((err) => {
      alert(err);
    });
}
