export default async function Register({
  email,
  username,
  password,
  navigation,
}) {
  return await fetch("https://sdi4-g2.herokuapp.com/register", {
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
      if (serverResponse.message.includes("Successfully")) {
        console.log(serverResponse);
        // alert('Account created successfully, please try logging in via main page.');
        navigation.navigate("SignUpSuccessScreen");
      } else return `${serverResponse.message}. Please try another.`;
    })

    .catch(() => {
      return console.log(`${serverResponse.message}`);
    });
}
