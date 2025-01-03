// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdK1GmM0SzT47U7377QcCYN6MT_kphxTg",
  authDomain: "ypzd-c3060.firebaseapp.com",
  projectId: "ypzd-c3060",
  storageBucket: "ypzd-c3060.firebasestorage.app",
  messagingSenderId: "443338546968",
  appId: "1:443338546968:web:cf26c204b348cdd449086d",
  measurementId: "G-KTE04BQF68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
