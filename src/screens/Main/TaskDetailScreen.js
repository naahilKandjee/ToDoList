import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getTask, updateTask, deleteTask } from '../../api/tasks';
import { uploadImageAndGetURL } from '../../api/firebase';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTask(taskId);
      if (taskData) {
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        if (taskData.imageUri) setImageUri(taskData.imageUri);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      let imageUrl = imageUri;
      if (imageUri && !imageUri.startsWith('http')) {
        imageUrl = await uploadImageAndGetURL(imageUri);
      }
      const updatedTask = { title, description, imageUri: imageUrl };
      await updateTask(taskId, updatedTask);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task. Please try again later.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImageUri(result.uri);
      setShowUploadButton(true);
    }
  };

  if (!task) return <View><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" style={styles.input} />
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={styles.input} multiline />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Choose Image" onPress={pickImage} />
      {showUploadButton && <Button title="Upload Image" onPress={handleUpdate} />}
      {!showUploadButton && <Button title="Update Task" onPress={handleUpdate} />}
      <Button title="Delete Task" onPress={() => deleteTask(taskId, navigation)} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default TaskDetailScreen;
