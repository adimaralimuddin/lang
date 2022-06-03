

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDD6gWVop1nyR1XFOeBD8TmXn3kp2cFGd0",
    authDomain: "lang-66632.firebaseapp.com",
    projectId: "lang-66632",
    storageBucket: "lang-66632.appspot.com",
    messagingSenderId: "463980100161",
    appId: "1:463980100161:web:dba674db8c5b3c07b6a4c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


