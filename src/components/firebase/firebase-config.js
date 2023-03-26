// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1LOeGeQcysSGJ2t1JyMyBtmhKhGL1MbU",
  authDomain: "group-chat-healthcare.firebaseapp.com",
  projectId: "group-chat-healthcare",
  storageBucket: "group-chat-healthcare.appspot.com",
  messagingSenderId: "641071450089",
  appId: "1:641071450089:web:ab498df6d60a1c7a9b2d78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
