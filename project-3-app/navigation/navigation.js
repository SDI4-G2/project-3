import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OctiIcons from "react-native-vector-icons/Octicons";

import WelcomeScreen from "../containers/WelcomeScreen";
import SignUpScreen from "../containers/SignUpScreen";
import Dashboard from "../containers/Dashboard";
import ProfileScreen from "../containers/ProfileScreen";
import EditProfile from "../containers/EditProfile";
import ArticleScreen from "../containers/ArticleScreen";
import VideoScreen from "../containers/VideoScreen";
import ForgetPwScreen from "../containers/ForgetPwScreen";
import VerificationScreen from "../containers/VerificationScreen";
import ResetPwScreen from "../containers/ResetPwScreen";
import ResetPwSuccessScreen from "../containers/ResetPwSuccessScreen";
import SubscriptionScreen from "../containers/SubscriptionScreen";
import SupportScreen from "../containers/SupportScreen";
import LibraryScreen from "../containers/LibraryScreen";
import SearchScreen from "../containers/SearchScreen";
import SubscriptionSuccessfulScreen from "../containers/SubscriptionSuccessfulScreen";
import SignUpSuccessScreen from "../containers/SignUpSuccessScreen";
import SubMainScreen from "../containers/SubMainScreen";
import SubscriptionCancellation from "../containers/SubscriptionCancellation";

import background from "../assets/background.png";
import { StyleSheet, ImageBackground } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubMainScreen"
        component={SubMainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#632646"
      barStyle={{
        backgroundColor: "rgba(222,222,222,0.1)",
      }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
          tabBarColor: "rgba(255,255,255,0.2)",
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Library"
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="table-multiple"
              color={color}
              size={26}
            />
          ),
          headerShown: false,
          tabBarColor: "rgba(255,255,255,0.2)",
        }}
        component={LibraryScreen}
        tabBarLabel="Library"
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <OctiIcons name="search" color={color} size={26} />
          ),
          headerShown: false,
          tabBarColor: "rgba(255,255,255,0.2)",
        }}
        component={SearchScreen}
        tabBarLabel="Search"
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPwScreen"
            component={ForgetPwScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPwScreen"
            component={ResetPwScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPwSuccessScreen"
            component={ResetPwSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SupportScreen"
            component={SupportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LibraryScreen"
            component={LibraryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubscriptionSuccessfulScreen"
            component={SubscriptionSuccessfulScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubscriptionCancellation"
            component={SubscriptionCancellation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpSuccessScreen"
            component={SignUpSuccessScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  bigText: {
    fontWeight: "400",
    fontSize: 25,
    lineHeight: 30,
    display: "flex",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
});

export default Navigation;
