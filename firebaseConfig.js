// Kauã e Miguel Borges
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxPsncTj6Hb37mGWjikmcKH98cVIZV8Zc",
  authDomain: "comumk-36637.firebaseapp.com",
  projectId: "comumk-36637",
  storageBucket: "comumk-36637.firebasestorage.app",
  messagingSenderId: "235479592808",
  appId: "1:235479592808:web:5c3d990f72d5c3567af0dd",
  measurementId: "G-9W3ZJWLZZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default app;