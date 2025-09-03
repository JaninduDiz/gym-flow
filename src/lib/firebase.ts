// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'gymflow-w4hud',
  appId: '1:190379023218:web:7eab4f64a22802cb0f5beb',
  storageBucket: 'gymflow-w4hud.firebasestorage.app',
  apiKey: 'AIzaSyAKc_glfs3gELgQgR7aN_r9sULQbPJTA7k',
  authDomain: 'gymflow-w4hud.firebaseapp.com',
  messagingSenderId: '190379023218',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
