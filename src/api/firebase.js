// src/api/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCuc_s2lkMA2QAFYsUVP-7ndEIopLTHIbQ",
  authDomain: "todolist-36857.firebaseapp.com",
  projectId: "todolist-36857",
  storageBucket: "todolist-36857.appspot.com",
  messagingSenderId: "274129625061",
  appId: "1:274129625061:web:b01082c5ef1e58e983190c"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Configurer la persistance de l'authentification avec AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
