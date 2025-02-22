// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // For Firestore
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsvn-d1cbXJnMgD1N3u7bzpLesqQCYpBM",
  authDomain: "pomoworld-80882.firebaseapp.com",
  projectId: "pomoworld-80882",
  storageBucket: "pomoworld-80882.firebasestorage.app",
  messagingSenderId: "110492268819",
  appId: "1:110492268819:web:9221672344650c5236c2e6",
  measurementId: "G-S61BB9BKJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);