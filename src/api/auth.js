import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut as firebaseSignOut } from 'firebase/auth';

// Inscription avec envoi de l'email de vérification
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    console.log('Email de vérification envoyé.');
    return userCredential;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Connexion avec vérification de l'email
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      console.error("Veuillez vérifier votre adresse e-mail.");
      throw new Error("Email not verified");
    }
    return userCredential;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Déconnexion
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { signUp, signIn, signOut };
