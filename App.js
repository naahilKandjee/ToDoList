import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';
import TabNavigator from './src/navigation/BottomTabNavigation';


import ColumnDetailsScreen from './src/screens/Main/ColumnDetailsScreen';
import AddColumnScreen from './src/screens/Main/AddColumnScreen';
import TaskDetailScreen from './src/screens/Main/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Écrans d'authentification */}
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'Connexion' }} />
        {/* Intégration du TabNavigator */}
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
        {/* Écrans détaillés accessibles via la navigation par pile */}
        <Stack.Screen name="ColumnDetails" component={ColumnDetailsScreen} options={{ title: 'Détails de la Colonne' }} />
        <Stack.Screen name="AddColumn" component={AddColumnScreen} options={{ title: 'Ajouter une Colonne' }} />
        <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={{ title: 'Détails de la Tâche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
