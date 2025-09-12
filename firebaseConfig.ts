// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiKNySiC7I6VAsOLYF0M3cr6OLFbBw_7Y",
  authDomain: "agroproject-bfeba.firebaseapp.com",
  projectId: "agroproject-bfeba",
  storageBucket: "agroproject-bfeba.firebasestorage.app",
  messagingSenderId: "24511047529",
  appId: "1:24511047529:web:eaee475b05728ef4153ff8",
  measurementId: "G-95QNMMSF9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it for use in other files
export const db = getFirestore(app);