import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';

// Créez un stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'Connexion' }} />
        {/* Ajoutez d'autres écrans ici */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
