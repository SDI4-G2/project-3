import * as SecureStore from "expo-secure-store";

export default async function GetCategory() {
  let result = await SecureStore.getItemAsync("token");

  const response = await fetch("https://sdi4-g2.herokuapp.com/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + result,
    },
  });
  const list = await response.json();
  const exportList = list.data;
  return exportList;
}
