import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ProfileButton from '../components/ProfileButtons';
import SecondHeaderBar from '../components/SecondHeader';

import LogOutButton from '../components/LogOutButton';
import { Avatar } from 'react-native-paper';
import Jwt from '../api/Jwt';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState('');
  function Logout() {
    SecureStore.deleteItemAsync('token');
    // alert("Logout Successful");
    navigation.navigate('WelcomeScreen');
  }

  async function getJwt() {
    const list = await Jwt();

    let userSlice = list.username.slice(0, 2);
    let user = userSlice.charAt(0).toUpperCase() + userSlice.slice(1);
    // console.log(user);
    return setUser(user);
  }

  useEffect(() => {
    getJwt();
  }, []);

  return (
    <View>
      <SecondHeaderBar backScreen="Dashboard"></SecondHeaderBar>
      <View style={{ alignItems: 'center' }}>
        <Avatar.Text
          size={150}
          label={user}
          backgroundColor="rgba(255,255,255,0.1)"
          color="rgba(255,255,255,0.5)"
          style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.padding} onPress={() => navigation.navigate('EditProfile')}>
          <ProfileButton naming="Edit Profile"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding} onPress={() => navigation.navigate('SubscriptionScreen')}>
          <ProfileButton naming="Subscription"></ProfileButton>
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding} onPress={() => navigation.navigate('SupportScreen')}>
          <ProfileButton naming="Help and Support"></ProfileButton>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={Logout} style={styles.paddingButton}>
        <LogOutButton naming="Log Out"></LogOutButton>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: '5%',
  },
  padding: {
    padding: 5,
    top: '5%',
  },
  avatar: {
    alignSelf: 'center',
    top: '0%',
  },
  paddingButton: {
    padding: '5%',
    top: 80,
  },
});
