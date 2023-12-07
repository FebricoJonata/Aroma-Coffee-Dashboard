import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //REACT_APP_FIREBASE_KEY = AIzaSyBD_ter025Ksj0ZF6E5Be67zDuLs943A5M
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "coffe-shop-903b5.firebaseapp.com",
  projectId: "coffe-shop-903b5",
  storageBucket: "coffe-shop-903b5.appspot.com",
  messagingSenderId: "352049637373",
  appId: "1:352049637373:web:a0937c686e3cec64929b94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);