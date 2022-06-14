import * as SecureStore from 'expo-secure-store';

export default async function GetArticle() {
  let result = await SecureStore.getItemAsync('token');
  await fetch('https://sdi4-g2.herokuapp.com/article', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + result,
    },
  })
    .then((response) => response.json())
    .then((serverResponse) => console.log(serverResponse));
}
