export default async function EditPassword({ email, newpassword, password, navigation }) {
  return await fetch('https://sdi4-g2.herokuapp.com/editpassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      newpassword: newpassword,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        alert('Password updated successfully.');
        return false;
      } else {
        alert(res.message);
        return true;
      }
    })
    .catch((err) => {
      alert(err);
    });
}
