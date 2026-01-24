// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr_yTXwLxp1IcJqgEvxkBFUJcoInnn04A",
  authDomain: "box-auth-9342a.firebaseapp.com",
  projectId: "box-auth-9342a",
  storageBucket: "box-auth-9342a.firebasestorage.app",
  messagingSenderId: "739536475330",
  appId: "1:739536475330:web:8c766fe2bbcaed833d175b",
  measurementId: "G-K9C2Q5YD0T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
