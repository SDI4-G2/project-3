export default async function Register({ email, username, password, navigation }) {
  await fetch('https://sdi4-g2.herokuapp.com/register', {
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
    .then(() => {
      alert('Account created successfully');
      navigation.navigate('Dashboard');
    })
    .catch(() => {
      alert('Please enter valid username, email and password');
    });
}
