
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  
  apiKey: process.env.REACT_APP_FIREBASE_KEY,

  authDomain: "videosharing-37279.firebaseapp.com",
  projectId: "videosharing-37279",
  storageBucket: "videosharing-37279.appspot.com",
  messagingSenderId: "662914876033",
  appId: "1:662914876033:web:ab5177ba081a1adca28380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

