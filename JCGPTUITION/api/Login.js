import * as SecureStore from 'expo-secure-store';

export default async function Login({ email, username, password, navigation }) {
  await fetch('https://sdi4-g2.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      SecureStore.setItemAsync('token', serverResponse.data);
      alert('Login Successful');
      navigation.navigate('Dashboard');
    })
    .catch((err) => {
      alert('Please enter valid email/username and password');
    });
}
