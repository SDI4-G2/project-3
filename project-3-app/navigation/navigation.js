import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../containers/WelcomeScreen";
import SignUpScreen from "../containers/SignUpScreen";
import Dashboard from "../containers/Dashboard";
import ProfileScreen from "../containers/ProfileScreen";
import EditProfile from "../containers/EditProfile";
import ArticleScreen from "../containers/ArticleScreen";
import VideoScreen from "../containers/VideoScreen";
// import ForgetPw from "../containers/ForgetPwScreen";
// import SubscriptionScreen from "../containers/SubscriptionScreen";
// import HistoryScreen from "../containers/HistoryScreen";
// import SupportScreen from "../containers/SupportScreen";
// import BookmarkScreen from "../containers/BookmarksScreen";
// import LibraryScreen from "../containers/LibraryScreen";
// import SubMainScreen from "../containers/SubMainScreen";
import background from "../assets/background.png";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const Stack = createNativeStackNavigator();

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
            component={Dashboard}
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
            name="ArticleScreen"
            component={ArticleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VideoScreen"
            component={VideoScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="ForgetPwScren"
            component={ForgetPw}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SupportScreen"
            component={SupportScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="BookmarkScreen"
            component={BookmarkScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="LibraryScreen"
            component={LibraryScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SubMainScreen"
            component={SubMainScreen}
            options={{ headerShown: false }}
          /> */}
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
