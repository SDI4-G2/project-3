import { Text, TouchableOpacity, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import * as SecureStore from 'expo-secure-store';
import Jwt from '../api/Jwt';

import Buttons from '../components/Buttons';
import Register from '../api/Register';
import SecondHeaderBar from '../components/SecondHeader';
import Bold from '../assets/Poppins_Bold';
import Small from '../assets/Poppins_Small';
import { useFonts } from 'expo-font';
import { Poppins_300Light } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFocusEffect } from '@react-navigation/native';

export default function SubscriptionScreen({ navigation }) {
  const [userdata, setUserdata] = useState('');
  const [subscribed, setSubscribed] = useState('false');
  const [checked, setChecked] = useState(true);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const [errMsg, setErrMsg] = useState(null);

  async function getJwt() {
    const list = await Jwt();
    setUserdata(list.email);
    setSubscribed(list.subscription);
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

  useFocusEffect(
    React.useCallback(() => {
      getJwt();
    }, [])
  );

  const fetchPaymentIntentClientSecret = async () => {
    let result = await SecureStore.getItemAsync('token');
    const response = await fetch('https://sdi4-g2.herokuapp.com/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const createPaymentDetails = async (stripeID) => {
    let result = await SecureStore.getItemAsync('token');
    const response = await fetch('https://sdi4-g2.herokuapp.com/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
      body: JSON.stringify({
        useremail: userdata,
        stripeid: stripeID,
      }),
    });
    const res_data = await response.json();
    return { res_data };
  };

  const updateSubscription = async (status) => {
    let result = await SecureStore.getItemAsync('token');
    const response = await fetch('https://sdi4-g2.herokuapp.com/update-subscription', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + result,
      },
      body: JSON.stringify({
        email: userdata,
        subscription: status,
      }),
    });
    const res_data = await response.json();

    SecureStore.setItemAsync('token', res_data.data);

    return { res_data };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      setErrMsg('Please enter complete card details');
      return;
    }
    const billingDetails = { email: userdata };

    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      //2. confirm the payment
      if (error) {
        alert('Unable to process payment');
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: 'Card',
          billingDetails: billingDetails,
        });

        if (error) {
          setErrMsg(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          console.log('Payment successful ', paymentIntent);
          // payment database
          const { res } = await createPaymentDetails(paymentIntent.id);

          // change subscription status
          const { res_subs } = await updateSubscription(!subscribed);

          // Alert.alert(
          //   "Payment Successful",
          //   "subscribed to our Premium Content",
          //   [
          //     { text: "OK", onPress: () => navigation.push("Dashboard") }
          //   ]
          // );
          navigation.navigate('SubscriptionSuccessfulScreen');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelSubscription = async () => {
    const { res_subs } = await updateSubscription(!subscribed);

    // Alert.alert(
    //   "Subscription Cancel",
    //   "You are no longer subscribe to our Premium Content",
    //   [{ text: "OK", onPress: () => navigation.push("Dashboard") }]
    // );
    navigation.navigate('SubscriptionCancellation');
  };
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View>
        <SecondHeaderBar backScreen="ProfileScreen" />
        <View style={styles.container}>
          <View style={styles.padding}>
            <Bold fontBold="Subscription"></Bold>
            {subscribed === true ? (
              <View>
                <View style={styles.fieldsInput}>
                  <View style={styles.userInput}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'rgba(255,255,255, 0.6)',
                      }}
                    >
                      You are already subscribed to our Premium Content!
                    </Text>
                  </View>
                </View>

                <View style={styles.buttonsbottom}>
                  <TouchableOpacity onPress={handleCancelSubscription} disabled={loading}>
                    <Buttons naming="Cancel Subscription"></Buttons>
                    {loading === true && <ActivityIndicator style={styles.loading} color={'rgba(255,255,255,0.5)'} />}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.fieldsInput}>
                  <View style={styles.userInput}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'rgba(255,255,255, 0.6)',
                      }}
                    >
                      You are not subscribed to our Premium Content
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={styles.userInput}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'rgba(255,255,255, 0.6)',
                        }}
                      >
                        - Access to all content
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'rgba(255,255,255, 0.6)',
                        }}
                      >
                        - Skip advertisements"
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  >
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                      <RadioButton status={checked === true ? 'checked' : 'unchecked'} color="rgba(255,255,255, 0.6)" />
                    </View>
                    <View style={{ flex: 4, paddingTop: 7 }}>
                      <Small style={{ marginTop: 27 }} fontSmall="1 Year Subscription @ $12.00"></Small>
                    </View>
                  </View>
                  {errMsg ? (
                    <Text style={{ color: 'rgba(226,91,91,0.6)', bottom: '5%' }}>{errMsg}</Text>
                  ) : (
                    <Text style={{ color: 'transparent' }}>hello</Text>
                  )}
                  <View>
                    <CardField
                      postalCodeEnabled={false}
                      placeholder={{
                        number: '4242 4242 4242 4242',
                      }}
                      cardStyle={styles.card}
                      style={styles.cardContainer}
                      onCardChange={(cardDetails) => {
                        setCardDetails(cardDetails);
                        setErrMsg(null);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.buttonsbottom}>
                  <TouchableOpacity onPress={handlePayPress} disabled={loading}>
                    <Buttons naming="Subscribe"></Buttons>
                    {loading === true && (
                      <View
                        style={[
                          {
                            width: 100,
                            height: 100,
                            backgroundColor: 'rgba(255, 255,255,0.2)',

                            borderRadius: 20,
                            justifyContent: 'space-evenly',
                            alignSelf: 'center',
                            bottom: 200,
                          },
                          styles.loading,
                        ]}
                      >
                        <ActivityIndicator color={'rgba(255,255,255,0.5)'} />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    padding: '10%',
  },

  fieldsInput: {
    top: '3%',
  },

  textContainer: {
    paddingTop: '5%',
  },

  buttonsbottom: {
    top: '20%',
  },

  disabled: {
    opacity: 0.5,
  },
  normal: {
    opacity: 1,
  },
  userInput: {
    height: 90,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    borderColor: 'rgba(255,255,255, 0.3)',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    zIndex: 10000,
  },
  cardContainer: {
    height: 50,
  },
});
