// src/screens/Main/AddColumnScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addColumn } from '../../api/columns';

const AddColumnScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');

  const handleAddColumn = async () => {
    await addColumn(title);
    if(route.params?.onGoBack) {
      route.params.onGoBack();
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de la colonne"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Ajouter Colonne" onPress={handleAddColumn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default AddColumnScreen;
