// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7xN2TAE-HmA1wl3lYf2jyUQb86uwHu_E",
  authDomain: "task-tracker-app-7bde3.firebaseapp.com",
  projectId: "task-tracker-app-7bde3",
  storageBucket: "task-tracker-app-7bde3.firebasestorage.app",
  messagingSenderId: "4127241720",
  appId: "1:4127241720:web:71478cbb236a21448b520d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };