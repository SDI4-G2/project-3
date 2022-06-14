import * as SecureStore from 'expo-secure-store';

export default async function GetVideo() {
  let result = await SecureStore.getItemAsync('token');
  await fetch('https://sdi4-g2.herokuapp.com/video', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + result,
    },
  })
    .then((response) => response.json())
    .then((serverResponse) => console.log(serverResponse));
}
