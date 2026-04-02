import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.getElementById("loginBtn").addEventListener("click", function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;

      // store login state
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userUID", user.uid);

      window.location.href = "/dashboard";

    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });

});