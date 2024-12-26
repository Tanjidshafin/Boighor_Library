// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKYtjOYt9RTKsGMZ9r0OL50rwE2nYqqNI',
  authDomain: 'boighor-f9b82.firebaseapp.com',
  projectId: 'boighor-f9b82',
  storageBucket: 'boighor-f9b82.firebasestorage.app',
  messagingSenderId: '923104259231',
  appId: '1:923104259231:web:f833db9310a3f9cf06c6aa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
