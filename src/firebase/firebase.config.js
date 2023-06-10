// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq3HvfAtoyYZFggc1dsUAVLN9zjh27rh4",
  authDomain: "summer-auth.firebaseapp.com",
  projectId: "summer-auth",
  storageBucket: "summer-auth.appspot.com",
  messagingSenderId: "959224216061",
  appId: "1:959224216061:web:9da1dc3021992a738ac194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;