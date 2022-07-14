import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Sadface2 from '../assets/Sadface2.png';
import { useFonts } from 'expo-font';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import Buttons from '../components/Buttons';
import { StackActions } from '@react-navigation/native';

const popAction = StackActions.pop(1);

export default function SubscriptionCancellation({ navigation, props }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        <View style={{ top: '5%', width: '80%', alignSelf: 'center' }}>
          <Image
            source={Sadface2}
            style={{
              height: 300,
              width: 300,
              alignSelf: 'center',
            }}
          />

          <Text
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Poppins_500Medium',
              fontSize: 45,
              textAlign: 'center',
            }}
          >
            Booohoooo!
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'left',

              fontFamily: 'Poppins_300Light',

              fontSize: 15,
            }}
          >
            We are sad to see you go......
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'left',
              fontFamily: 'Poppins_300Light',

              fontSize: 15,
            }}
          >
            You can subscribe with us anytime......
          </Text>
          <TouchableOpacity style={{ top: '10%' }} onPress={() => navigation.dispatch(popAction)}>
            <Buttons naming={'Return to Dashboard'} />
          </TouchableOpacity>
        </View>
      </View>
    );
}
