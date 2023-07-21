// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoNE2aWVh-5HvNpxc5CqX9nLE7pdXiR0w",
  authDomain: "react-native-messenger-66f1b.firebaseapp.com",
  projectId: "react-native-messenger-66f1b",
  storageBucket: "react-native-messenger-66f1b.appspot.com",
  messagingSenderId: "758230530783",
  appId: "1:758230530783:web:2730b1965bc401c757876a",
  measurementId: "G-YJ0HPFX6HQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db,firebase };
