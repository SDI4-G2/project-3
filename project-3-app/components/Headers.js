import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Header } from '@rneui/themed';
import profileIcon from '../assets/profileicon.png';
import arrow from '../assets/chevron-left.png';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import Jwt from '../api/Jwt';

export default function HeaderBar() {
  const navigation = useNavigation();

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

  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrow} />
          </TouchableOpacity>
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
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
      }}
    ></Header>
  );
}
