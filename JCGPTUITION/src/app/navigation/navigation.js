import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/authentication/signupscreen';
// import LoginScreen from "../screens/authentication/loginscreen";
// import ForgetPwdScreen from '../screens/authentication/forgetpwdscreen';
// import DashboardScreen from '../screens/dashboard/dashboard';
// import VideoScreen from '../screens/videos/viewvideo';
// import ArticleScreen from '../screens/articles/viewarticles';
// import ProfileScreen from '../screens/profile/profile';r
// import EditProfileScreen from '../screens/profile/editprofile';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false}}/>
                {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ForgetPwdScreen" component={ForgetPwdScreen} />
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} />
                <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} /> */}

            </Stack.Navigator> 
        </NavigationContainer>       
    )
}
export default Navigation