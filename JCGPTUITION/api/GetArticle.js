import * as SecureStore from 'expo-secure-store';

export default async function GetArticle() {
  let result = await SecureStore.getItemAsync('token');

  const response = await fetch('https://sdi4-g2.herokuapp.com/article', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + result,
    },
  });
  const list = JSON.stringify(await response.json());
  return list;
}
