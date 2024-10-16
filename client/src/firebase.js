// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estste-532fc.firebaseapp.com",
  projectId: "mern-estste-532fc",
  storageBucket: "mern-estste-532fc.appspot.com",
  messagingSenderId: "958115061170",
  appId: "1:958115061170:web:0686bd22d0b09a626418ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);