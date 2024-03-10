import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getTasks, addTask } from '../../api/tasks';

const ColumnDetailsScreen = ({ route, navigation }) => {
  const { columnId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [columnId]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks(columnId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      if (!newTaskTitle.trim()) {
        Alert.alert("Erreur", "Le titre de la tâche ne peut pas être vide.");
        return;
      }
      // Directement utiliser newTaskTitle et newTaskDescription saisies par l'utilisateur
      const newTask = await addTask(columnId, newTaskTitle, newTaskDescription);
      setTasks([...tasks, newTask]); // Ajouter la nouvelle tâche à la liste des tâches affichées
      setNewTaskTitle(''); // Réinitialiser le titre après l'ajout
      setNewTaskDescription(''); // Réinitialiser la description après l'ajout
      fetchTasks(); // Rafraîchir la liste des tâches
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Titre de la tâche"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description de la tâche"
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
        style={styles.input}
        multiline
      />
      <Button title="Ajouter Tâche" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => navigation.navigate('TaskDetailScreen', { taskId: item.id, columnId: columnId })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  taskItem: {
    padding: 10,
    marginTop: 8,
    backgroundColor: '#f0f0f0',
  },
});

export default ColumnDetailsScreen;
