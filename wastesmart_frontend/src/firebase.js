// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiVEAnXMy6YOhC2uFn6b8Xzmk2Tc1Wb3g",
  authDomain: "gryco-35799.firebaseapp.com",
  projectId: "gryco-35799",
  storageBucket: "gryco-35799.firebasestorage.app",
  messagingSenderId: "629186427515",
  appId: "1:629186427515:web:c5c4ef2d020e1233f200de",
  measurementId: "G-3RL3CYVT9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };