// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDogqSCfd_HDrlyhnkUZw4918QN1GYGdZc",
  authDomain: "toko-8238c.firebaseapp.com",
  projectId: "toko-8238c",
  storageBucket: "toko-8238c.firebasestorage.app",
  messagingSenderId: "116443928831",
  appId: "1:116443928831:web:5d23995ce3de1da80214ca",
  measurementId: "G-WLNDCM0QG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
