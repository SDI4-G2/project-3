import { Text, TouchableOpacity, StyleSheet, View, Button, Image } from 'react-native';

import React, { useState, useEffect } from 'react';

import SecondHeaderBar from '../components/SecondHeader';
import Bold from '../assets/Poppins_Bold';
import editingIconSeven from '../assets/editingiconseven.png';
import { useFonts } from 'expo-font';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { BottomSheet } from 'react-native-btr';
import chevronDown from '../assets/chevronDown.png';
import Small from '../assets/Poppins_Small';
import { TextInput } from 'react-native-paper';
import LogOutButton from '../components/LogOutButton';
import { LinearGradient } from 'expo-linear-gradient';

import Jwt from '../api/Jwt';

export default function EditProfile({ firstLine, textForInput }) {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState([]);
  const [useremail, setUseremail] = useState([]);

  async function getJwt() {
    const list = await Jwt();
    setUsername(list.username);
    setUseremail(list.email);
  }

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  useEffect(() => {
    getJwt();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        <SecondHeaderBar />
        <View style={styles.container}>
          <Bold fontBold="Edit Profile"></Bold>
          <View style={styles.padding}>
            <View style={styles.fieldsInput}>
              <View style={styles.buttonComponent}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.buttonText}>Username</Text>
                  <Text style={styles.buttonTextTwo}>{username}</Text>
                </View>
                <TouchableOpacity style={styles.editingIcon} onPress={toggleBottomNavigationView}>
                  <Image source={editingIconSeven} style={{ height: 45, width: 45, opacity: 0.8 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonComponent}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.buttonText}>E-mail</Text>
                  <Text style={styles.buttonTextTwo}>{useremail}</Text>
                </View>
              </View>
              <View style={styles.buttonComponent}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.buttonText}>Password</Text>
                  <Text style={styles.buttonTextTwo}>******</Text>
                </View>
                <TouchableOpacity style={styles.editingIcon}>
                  <Image source={editingIconSeven} style={{ height: 45, width: 45, opacity: 0.8 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom sheet
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            {/*Bottom Sheet inner View*/}
            <View style={styles.bottomNavigationView}>
              <View
                style={{
                  // flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <LinearGradient
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['rgba(203,179,132,0.5)', 'rgba(125,114,93,0.1)']}
                >
                  <Image
                    source={chevronDown}
                    style={{
                      height: 50,
                      width: 50,
                      opacity: 0.8,

                      alignSelf: 'center',
                    }}
                  />
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '70%',
                    }}
                  >
                    <Small fontSmall={'Edit Username'}></Small>
                  </View>
                  <TouchableOpacity>
                    <TextInput
                      // onChangeText={(text) => validate(text)}
                      style={styles.userInput}
                      theme={{ colors: { text: 'rgba(255, 255, 255, 0.6)' } }}
                    >
                      banana
                    </TextInput>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '70%',
                      paddingTop: '3%',
                    }}
                  >
                    <Small fontSmall={'Enter your password to confirm'}></Small>
                  </View>

                  <TouchableOpacity>
                    <TextInput
                      // onChangeText={(text) => validate(text)}
                      style={styles.userInput}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      theme={{ colors: { text: 'rgba(255, 255, 255, 0.6)' } }}
                    ></TextInput>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingTop: '5%',
                      width: '85%',
                      alignSelf: 'center',
                    }}
                  >
                    <LogOutButton naming="Save Changes"></LogOutButton>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </BottomSheet>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: '10%',
    paddingRight: '10%',
  },

  padding: {
    paddingTop: '0%',
  },

  buttonComponent: {
    borderWidth: 1,
    padding: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'left',
    fontFamily: 'Poppins_500Medium',
    color: 'white',
    opacity: 0.8,

    fontSize: 20,
  },
  buttonTextTwo: {
    textAlign: 'left',
    fontFamily: 'Poppins_300Light',
    color: 'white',
    opacity: 0.8,
    // paddingTop: 5,
    fontSize: 13,
  },
  editingIcon: {
    alignSelf: 'center',
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 55,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    borderColor: 'rgba(255,255,255, 0.3)',
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
  },
  noInput: {
    height: 55,
    backgroundColor: 'rgba(186, 192, 202, 0.6)',
    borderColor: 'rgba(102, 112, 128, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'white',
    opacity: 0.4,
    width: '100%',
    alignSelf: 'center',
  },
  bottomNavigationView: {
    // backgroundColor: "rgba(000,000,000,0.5)",
    height: 280,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  gradient: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 280,
  },
  userInput: {
    height: 40,
    backgroundColor: 'rgba(31,29,28,0.3)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingHorizontal: 10,
    width: '70%',
    alignSelf: 'center',
  },
});
