import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt1EAPEp9h-eUs5aQRRwqGGS_HbJxvxnk",
  authDomain: "skill-exchange-platform-46120.firebaseapp.com",
  projectId: "skill-exchange-platform-46120",
  storageBucket: "skill-exchange-platform-46120.firebasestorage.app",
  messagingSenderId: "668802136174",
  appId: "1:668802136174:web:644b5cdc3c1d9333408e7f",
  measurementId: "G-VJEKQWG9KV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };