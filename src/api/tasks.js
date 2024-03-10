import { db } from './firebase';
import { storage } from './firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

// Ajouter une tâche
const addTask = async (columnId, title, description, imageUri) => {
    let imageUrl = null;
    if (imageUri) {
        imageUrl = await uploadImageAndGetURL(imageUri);
    }
    const docRef = await addDoc(collection(db, "tasks"), {
        columnId,
        title,
        description,
        imageUrl
    });
    console.log("Task written with ID: ", docRef.id);
    return { id: docRef.id, columnId, title, description, imageUrl };
};

// Télécharger l'image vers Firebase Storage et obtenir l'URL
const uploadImageAndGetURL = async (imageUri) => {
    console.log("Image URI:", imageUri);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileRef = ref(storage, `tasks/${new Date().toISOString()}`);
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
};

// Lire les tâches d'une colonne
const getTasks = async (columnId) => {
    const q = query(collection(db, "tasks"), where("columnId", "==", columnId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Récupérer une tâche spécifique par ID
const getTask = async (taskId) => {
    const taskDocRef = doc(db, "tasks", taskId);
    const taskDoc = await getDoc(taskDocRef);
    if (taskDoc.exists()) {
        return { id: taskDoc.id, ...taskDoc.data() };
    } else {
        console.log("No such document!");
        return null;
    }
};

// Mettre à jour une tâche
const updateTask = async (taskId, updates) => {
    if (updates.imageUri && !updates.imageUri.startsWith('http')) {
        updates.imageUrl = await uploadImageAndGetURL(updates.imageUri);
        delete updates.imageUri;
    }
    await updateDoc(doc(db, "tasks", taskId), updates);
    console.log("Task updated with ID: ", taskId);
};

// Supprimer une tâche
const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    console.log("Task deleted with ID: ", taskId);
};

export { addTask, getTasks, getTask, updateTask, deleteTask };
