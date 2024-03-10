import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importez vos écrans ici
import HomeScreen from '../../screens/Main/HomeScreen'; // Ajustez le chemin selon votre structure de dossier
import ProfileScreen from '../../screens/Main/ProfileScreen'; // Ajustez le chemin selon votre structure de dossier

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
