import firebase from "firebase/compat/app";
import "firebase/compat/storage"
import "firebase/compat/firestore"
import 'firebase/compat/auth';

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
// var firebaseConfig =
export const app = firebase.initializeApp ({
    "apiKey": "AIzaSyDNDj9OMqE-59GHcP6qeT20HAONCYqfgtc",

    "authDomain": "proyecto-final-47802.firebaseapp.com",
  
    "projectId": "proyecto-final-47802",
  
    "storageBucket": "proyecto-final-47802.appspot.com",
  
    "messagingSenderId": "34793343389",
  
    "appId": "1:34793343389:web:425a0fa3223d941c648774"
  
});
// const firebaseApp = firebase.initializeApp(firebaseConfig)