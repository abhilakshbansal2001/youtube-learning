import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBMHqWFjvkhQJFCuC9j46E3eE2ElMfrU7Q",
    authDomain: "elearning-68a2d.firebaseapp.com",
    databaseURL: "https://elearning-68a2d.firebaseio.com",
    projectId: "elearning-68a2d",
    storageBucket: "elearning-68a2d.appspot.com",
    messagingSenderId: "489109401821",
    appId: "1:489109401821:web:b590c869e3a1f0601fab34",
    measurementId: "G-HHR5WVS3DP"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const fb = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage();

export {db,auth,google,fb,storage}