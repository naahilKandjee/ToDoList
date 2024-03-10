// src/api/columns.js
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Ajouter une colonne
const addColumn = async (title) => {
  try {
    const docRef = await addDoc(collection(db, "columns"), { title });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Lire toutes les colonnes
const getColumns = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "columns"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

// Mettre à jour une colonne
const updateColumn = async (columnId, title) => {
  try {
    await updateDoc(doc(db, "columns", columnId), { title });
    console.log("Document updated with ID: ", columnId);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Supprimer une colonne
const deleteColumn = async (columnId) => {
  try {
    await deleteDoc(doc(db, "columns", columnId));
    console.log("Document deleted with ID: ", columnId);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export { addColumn, getColumns, updateColumn, deleteColumn };
