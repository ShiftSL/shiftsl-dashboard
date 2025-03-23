import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_0fvLdpHzkvujPy3GOYxl2MEEmTndyzY",
    authDomain: "shiftsl.firebaseapp.com",
    projectId: "shiftsl",
    storageBucket: "shiftsl.firebasestorage.app",
    messagingSenderId: "460862358133",
    appId: "1:460862358133:web:1177b7fc0c69b5a7ca6e3c",
    measurementId: "G-QBB8XXPJYM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;