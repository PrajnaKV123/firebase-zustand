// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2ZRK-9lrmKsngdLiCXIDgvvzHEHZP60",
  authDomain: "assignment-2e7e2.firebaseapp.com",
  projectId: "assignment-2e7e2",
  storageBucket: "assignment-2e7e2.firebasestorage.app",
  messagingSenderId: "94814851672",
  appId: "1:94814851672:web:d8178bf1153607836df02d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)