// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBnjAbVjd8U6LNORQ_dQEahlxUvaofUF64",

  authDomain: "react-app-curso-bdea0.firebaseapp.com",

  projectId: "react-app-curso-bdea0",

  storageBucket: "react-app-curso-bdea0.appspot.com",

  messagingSenderId: "589995583770",

  appId: "1:589995583770:web:e7255545987925d0ada4a3",

  measurementId: "G-CFV42QBS9M"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);