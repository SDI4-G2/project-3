import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { Header } from '@rneui/themed';
import profileIcon from '../assets/profileicon.png';
import arrow from '../assets/chevron-left.png';
import { useNavigation } from '@react-navigation/native';
import Med from '../assets/Poppins_Medium';
import React, { useState, useEffect } from 'react';

import Jwt from '../api/Jwt';

export default function HeaderDashboard() {
  const navigation = useNavigation();

  const [userdata, setUserdata] = useState([]);

  async function getJwt() {
    const list = await Jwt();
    setUserdata(list.username);
  }

  async function expiryTimeout() {
    const list = await Jwt();
    const time = new Date().getTime() / 1000;
    // console.log('jwt:' + list.exp, 'time' + time);
    if (list.exp < time) {
      alert('Login timeout. Please login again.');
      navigation.navigate('WelcomeScreen');
    }
  }
  expiryTimeout();

  useEffect(() => {
    getJwt();
  }, []);

  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View style={{ width: 250, marginTop: 10 }}>
          <Text style={styles.bigText}>Hi, {userdata}!</Text>
        </View>
      }
      rightComponent={
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Image source={profileIcon} />
          </TouchableOpacity>
        </View>
      }
      containerStyle={{
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
      }}
    ></Header>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 30,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
