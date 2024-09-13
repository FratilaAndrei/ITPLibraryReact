// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// export const apiURL2 = import.meta.env.VITE_APP_API_URL;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "itp-libraryreact.firebaseapp.com",
//   storageBucket: "itp-libraryreact.appspot.com",
//   measurementId: "G-0Z3V13LDMV",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   dbRealTime: import.meta.env.VITE_APP_API_URL,
// };

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// export default getFirestore();
// const analytics = getAnalytics(app);

import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
