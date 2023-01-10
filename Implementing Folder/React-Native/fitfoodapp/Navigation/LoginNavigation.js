
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';



const RootStack = createStackNavigator();

const screenOptions = {
    headerShown: false,
  };

export default function LoginNavigation() {
  return (
    <RootStack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={screenOptions}>
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
    </RootStack.Navigator>
  );
}