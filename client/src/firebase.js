// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-d0fe6.firebaseapp.com',
  projectId: 'mern-estate-d0fe6',
  storageBucket: 'mern-estate-d0fe6.appspot.com',
  messagingSenderId: '155041675656',
  appId: '1:155041675656:web:b8098bad4159d8b48d223d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
