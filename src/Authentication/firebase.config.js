// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOynAqT3XSv3wnnPcXe-xYkOWaluoP3XA",
  authDomain: "food-donation-auth.firebaseapp.com",
  projectId: "food-donation-auth",
  storageBucket: "food-donation-auth.firebasestorage.app",
  messagingSenderId: "1077346582089",
  appId: "1:1077346582089:web:325f4e840c5dd9083b8998"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Allow phone authentication without sending SMS in development mode
if (window.location.hostname === 'localhost') {
  auth.useDeviceLanguage();
  auth.settings.appVerificationDisabledForTesting = true;  // Disable app verification for testing
}


export default auth;