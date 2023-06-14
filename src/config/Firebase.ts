// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDzdR13UwkMO_d6vHFcdXufZ9Wc5t5-Gro",
  authDomain: "ledcube-b9645.firebaseapp.com",
  projectId: "ledcube-b9645",
  storageBucket: "ledcube-b9645.appspot.com",
  messagingSenderId: "937618905345",
  appId: "1:937618905345:web:fb49835d3632e40c3ca300",
  measurementId: "G-6N47Q23E2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const realtimeDatabase = getDatabase(app)