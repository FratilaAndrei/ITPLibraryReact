// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// export const apiURL2 = import.meta.env.VITE_APP_API_URL;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

import axios from "axios";
// import { initializeApp } from "firebase-admin/app";
// import { admin } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   storageBucket: import.meta.env.VITE_APP_BUCKET_STORAGE,
// };
// Initialize Firebase
export const API_BUCKET = import.meta.env.VITE_APP_STORAGE_BUCKET;
export const API_URL = import.meta.env.VITE_APP_DATABASE_URL;
export const SERVICE_ACCOUNT = import.meta.env.VITE_APP_SERVICE_ACCOUNT;

// export default getFirestore();
// const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the servicee

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
export const auth22 = getAuth(app);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// JWT

// function firebaseCustomToken(userId: string) {
//   const fbAuth = getAuth(app);
//   const customClaims = {
//     email: import.meta.env.VITE_APP_EMAIL,
//   };

//   const customToken = fbAuth
//     .createCustomToken(userId, customClaims)
//     .then((userCredentials) => {
//       return userCredentials;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return customToken;
// }

// const customToken = "";

// signInWithCustomToken(auth, customToken)
//   .then((userCredentials) => {
//     console.log("Login Success");
//   })
//   .catch((error) => {
//     console.log(error);
// });

// Firebase Admin
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//     "https://itp-libraryreact-default-rtdb.europe-west1.firebasedatabase.app",
// });
