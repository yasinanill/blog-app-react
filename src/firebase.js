import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,onAuthStateChanged,updateProfile
} from "firebase/auth";
import toast from "react-hot-toast";






const firebaseConfig = {
  apiKey: "AIzaSyCqfb0LR272nrjm894TSCEfXD3MSzxdDc0",
  authDomain: "react-blogs-app-1cff3.firebaseapp.com",
  projectId: "react-blogs-app-1cff3",
  storageBucket: "react-blogs-app-1cff3.appspot.com",
  messagingSenderId: "88571565290",
  appId: "1:88571565290:web:48aa04c0bdf114a5187393"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db,storage}