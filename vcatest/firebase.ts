// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCsHwTTfjoMGgLThqcFqTpVlBfyGe0ytg",
  authDomain: "vcatest-5ff75.firebaseapp.com",
  projectId: "vcatest-5ff75",
  storageBucket: "vcatest-5ff75.appspot.com",
  messagingSenderId: "19540561930",
  appId: "1:19540561930:web:93e7a4c0a4aee290114ff3",
  measurementId: "G-2GCN005RCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
