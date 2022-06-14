import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import WelcomeScreen from "../containers/WelcomeScreen";
import SignUpScreen from "../containers/SignUpScreen";
// import Dashboard from "../containers/Dashboard";
// import ProfileScreen from "../containers/ProfileScreen";
// import EditProfile from "../containers/EditProfile";
// import ArticleScreen from "../containers/ArticleScreen";
// import VideoScreen from "../containers/VideoScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
