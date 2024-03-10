import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { getColumns, updateColumn, deleteColumn } from '../../api/columns';
import PulsingButton from '../../components/PulsingButton';
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  const [columns, setColumns] = useState([]);
  const [editingColumn, setEditingColumn] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      fetchColumns();
    }, [])
  );

  const fetchColumns = async () => {
    const columnsData = await getColumns();
    setColumns(columnsData);
  };

  const handleUpdateColumn = async (id) => {
    await updateColumn(id, newTitle);
    setEditingColumn(null);
    fetchColumns();
  };

  const handleDeleteColumn = async (id) => {
    Alert.alert("Supprimer la colonne", "Êtes-vous sûr de vouloir supprimer cette colonne ?", [
      {
        text: "Annuler",
        style: "cancel"
      },
      { text: "Oui", onPress: async () => {
          await deleteColumn(id);
          fetchColumns();
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {editingColumn === item.id ? (
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          style={styles.input}
          autoFocus={true}
          onBlur={() => setEditingColumn(null)}
        />
      ) : (
        <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('ColumnDetails', { columnId: item.id, title: item.title })}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonsContainer}>
        {editingColumn === item.id ? (
          <Button title="Sauvegarder" onPress={() => handleUpdateColumn(item.id)} />
        ) : (
          <>
            <Button title="Modifier" onPress={() => { setEditingColumn(item.id); setNewTitle(item.title); }} />
            <Button title="Supprimer" onPress={() => handleDeleteColumn(item.id)} />
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={columns}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
<PulsingButton title="Ajouter Colonne" onPress={() => navigation.navigate('AddColumn', {
  onGoBack: () => fetchColumns(),
})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default HomeScreen;
