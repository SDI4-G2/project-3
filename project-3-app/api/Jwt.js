import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export default async function Jwt() {
  const token = await SecureStore.getItemAsync('token');
  const decoded = jwt_decode(token);
  //   console.log(decoded);

  return decoded;
}
