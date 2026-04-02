import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        document.getElementById("message").innerText = "Signup successful!";

        // Move user to dashboard
        window.location.href = "/dashboard";

    })
    .catch((error) => {

        document.getElementById("message").innerText = error.message;

    });

});