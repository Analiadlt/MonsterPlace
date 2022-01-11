import firebase from "firebase/compat/app";
import "firebase/compat/storage"
import "firebase/compat/firestore"
import 'firebase/compat/auth';

require('dotenv').config();
// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
// var firebaseConfig =
export const app = firebase.initializeApp ({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,

    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  
});