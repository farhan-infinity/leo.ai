
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYGHg3v4vAdLFAxy2ztfnoYqsATJVDhuQ",
  authDomain: "clatter-c6b65.firebaseapp.com",
  projectId: "clatter-c6b65",
  storageBucket: "clatter-c6b65.appspot.com",
  messagingSenderId: "1030617930410",
  appId: "1:1030617930410:web:8022741cb7c9c03bbf8ed3",
  measurementId: "G-Q9HV0RZV89",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export default auth;
