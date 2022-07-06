import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';

import React, { useState, useEffect } from 'react';

import SecondHeaderBar from '../components/SecondHeader';
import Bold from '../assets/Poppins_Bold';
import editingIconSeven from '../assets/editingiconseven.png';
import { useFonts } from 'expo-font';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import ModalEditUsername from '../components/ModalEditUsername';
import ModalEditPassword from '../components/ModalEditPassword';

import Jwt from '../api/Jwt';

export default function EditProfile() {
  const [username, setUsername] = useState([]);
  const [useremail, setUseremail] = useState([]);

  const [modalUsernameVisible, setModalUsernameVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  async function getJwt() {
    const list = await Jwt();
    setUsername(list.username);
    setUseremail(list.email);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getJwt();
    }, 3000);
    return () => clearInterval(interval);
  });

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        <SecondHeaderBar backScreen="ProfileScreen"/>
        <View style={styles.container}>
          <Bold fontBold="Edit Profile"></Bold>
          <View style={styles.padding}>
            <View style={styles.fieldsInput}>
              <View style={styles.buttonComponent}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.buttonText}>Username</Text>
                  <Text style={styles.buttonTextTwo}>{username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.editingIcon}
                  // onPress={toggleBottomNavigationView}
                  onPress={() => setModalUsernameVisible(!modalUsernameVisible)}
                >
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
                <TouchableOpacity style={styles.editingIcon} onPress={() => setModalPasswordVisible(!modalPasswordVisible)}>
                  <Image source={editingIconSeven} style={{ height: 45, width: 45, opacity: 0.8 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {modalUsernameVisible ? <ModalEditUsername usernameInput={username} useremailInput={useremail} /> : null}
          {modalPasswordVisible ? <ModalEditPassword useremailInput={useremail} /> : null}
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
});
