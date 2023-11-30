// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFaHIEqWHXB9Hn0YUu_gE72IA81E-JOyY",
  authDomain: "food-frenzy-84989.firebaseapp.com",
  projectId: "food-frenzy-84989",
  storageBucket: "food-frenzy-84989.appspot.com",
  messagingSenderId: "1058749180180",
  appId: "1:1058749180180:web:1b6c9dbbae9b9ef5547a01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
