// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4b9AfMFtzG1alSY3mlzgMisfz0GpXDA0",
  authDomain: "fir-reactnativeproject-48caf.firebaseapp.com",
  projectId: "fir-reactnativeproject-48caf",
  storageBucket: "fir-reactnativeproject-48caf.appspot.com",
  messagingSenderId: "983745946457",
  appId: "1:983745946457:web:3a638448b7ad55b0c76248"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }