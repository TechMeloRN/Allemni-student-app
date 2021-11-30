import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen_Test from './src/Testapp/screen_Home'
import Profile_Test from './src/Testapp/screen_Profile'

import SplashScreen from './src/screens/screen_Splash'
import NewInitialScreen from './src/screens/screen_InitialScreen'
import NewLoginScreen from './src/screens/screen_Login'
import SignUpScreen from './src/screens/screen_SignUp'
import MenuScreen from './src/screens/screen_MenuScreen'
import ChatTeacherList from './src/screens/screen_ChatTeacherList'
import ChatMessage from './src/screens/screen_ChatMessage'
import NewClassroom from './src/screens/screen_Classroom'
import PersonalProfile from './src/screens/screen_PersonalProfile'
import LoginVerification from './src/screens/screen_LoginVerification'
import SignupVerification from './src/screens/screen_SignupVerification'

//Phase III 
import HomeScreen from './src/screens/screen_Home'
import SearchTeacher from './src/screens/screen_SearchTeacher'
import TextualSearch from './src/screens/screen_TextualSearch'
import TeacherPersonalInfo from './src/screens/screen_TeacherDetails-PersonalInfo'

//Authentication Test
import SendAuth from './src/Testapp/AuthFunc'
import ConfirmAuth from './src/Testapp/confirmCode'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
        <Stack.Screen name="SplashScreen"  component={SplashScreen} />
        <Stack.Screen name="NewInitialScreen"  component={NewInitialScreen} />
        <Stack.Screen name="NewLoginScreen"  component={NewLoginScreen} />
        <Stack.Screen name="LoginVerification"  component={LoginVerification} />

        <Stack.Screen name="SignUpScreen"  component={SignUpScreen} />
        <Stack.Screen name="SignupVerification"  component={SignupVerification} />
        <Stack.Screen name="MenuScreen"  component={MenuScreen} />
        <Stack.Screen name="ChatTeacherList"  component={ChatTeacherList} />
        <Stack.Screen name="ChatMessage"  component={ChatMessage} />
        <Stack.Screen name="NewClassroom" component={NewClassroom} />
        <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
        
        {/* Phase III */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SearchTeacher" component={SearchTeacher} />
        <Stack.Screen name="TextualSearch" component={TextualSearch} />
        <Stack.Screen name="TeacherPersonalInfo" component={TeacherPersonalInfo} />

        <Stack.Screen name="HomeScreen_Test" component={HomeScreen_Test} />
        <Stack.Screen name="Profile_Test" component={Profile_Test} />
        <Stack.Screen name="SendAuth" component={SendAuth} />
        <Stack.Screen name="ConfirmAuth" component={ConfirmAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

