// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_0fvLdpHzkvujPy3GOYxl2MEEmTndyzY",
    authDomain: "shiftsl.firebaseapp.com",
    projectId: "shiftsl",
    storageBucket: "shiftsl.firebasestorage.app",
    messagingSenderId: "460862358133",
    appId: "1:460862358133:web:1177b7fc0c69b5a7ca6e3c",
    measurementId: "G-QBB8XXPJYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;