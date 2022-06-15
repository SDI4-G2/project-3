import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../containers/WelcomeScreen";
import SignUpScreen from "../containers/SignUpScreen";
import Dashboard from "../containers/Dashboard";
// import ProfileScreen from "../containers/ProfileScreen";
// import EditProfile from "../containers/EditProfile";
// import ArticleScreen from "../containers/ArticleScreen";
// import VideoScreen from "../containers/VideoScreen";
import background from "../assets/background.png";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

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
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} /> */}
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
});

export default Navigation;
