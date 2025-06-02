// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYwm0Hx5JHSJPwvkZrhjtRqbZ_CS-ukh0",
  authDomain: "javlin-3a671.firebaseapp.com",
  projectId: "javlin-3a671",
  storageBucket: "javlin-3a671.appspot.com",
  messagingSenderId: "564644371835",
  appId: "1:564644371835:web:53b3558b2a74b46a5b71de",
  measurementId: "G-H8TFZYLK07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
