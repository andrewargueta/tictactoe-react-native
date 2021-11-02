// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';


const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        
      />       
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        
      />
      <Stack.Screen 
       name="Home" 
       component={HomeScreen} 
       
      />
      <Stack.Screen 
       name="Game" 
       component={GameScreen} 
       
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}