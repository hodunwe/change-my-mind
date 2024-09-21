import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRQJWtSxOf0hnQbIfW6G-rjiDB11jtDtM",
    authDomain: "change-my-mind-34f1d.firebaseapp.com",
    projectId: "change-my-mind-34f1d",
    storageBucket: "change-my-mind-34f1d.appspot.com",
    messagingSenderId: "500801808232",
    appId: "1:500801808232:web:508d9b3be08b16a5cb58dd",
    measurementId: "G-26VNBCY7B8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };