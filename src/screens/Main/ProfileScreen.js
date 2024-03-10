// src/screens/Main/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { signOut } from '../../api/auth';

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace('SignInScreen');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Button title="Se déconnecter" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProfileScreen;
