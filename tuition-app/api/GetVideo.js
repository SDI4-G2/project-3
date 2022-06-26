import * as SecureStore from 'expo-secure-store';

export default async function GetVideo() {
  let result = await SecureStore.getItemAsync('token');

  const response = await fetch('https://sdi4-g2.herokuapp.com/video', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + result,
    },
  });
  const list = await response.json();
  const exportList = list.data;
  return exportList;
}
