// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseconfig = {
  apiKey: "AIzaSyDAIQ7919VbCy8qxWQ2FOMYBHbJY8ZyXBE",
  authDomain: "my-first-project-403bd.firebaseapp.com",
  projectId: "my-first-project-403bd",
  storageBucket: "my-first-project-403bd.firebasestorage.app",
  messagingSenderId: "344876457942",
  appId: "1:344876457942:web:b7cf2c1dd0a69101c24e77",
  measurementId: "G-4CHT4S35Z1"
};

// Initialize Firebase
export const app = initializeApp(firebaseconfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);
