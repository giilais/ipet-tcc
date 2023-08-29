import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAc_wvzUcBcO0tza3shkSa9ebE9chK9ass",
  authDomain: "ipet-44528.firebaseapp.com",
  projectId: "ipet-44528",
  storageBucket: "ipet-44528.appspot.com",
  messagingSenderId: "852401796056",
  appId: "1:852401796056:web:0623b669184e1814f3b8ad",
  measurementId: "G-6WHND1JPQC"
});

// Initialize Firebase
export const auth = getAuth(firebaseApp);


