import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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


const teachBox = document.getElementById("teachSkills");
const learnBox = document.getElementById("learnSkills");
const saveBtn = document.getElementById("saveBtn");
const message = document.getElementById("message");


saveBtn.onclick = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Login first");
    return;
  }

  const teachSkills = teachBox.value.trim();
  const learnSkills = learnBox.value.trim();

  if (teachSkills === "" || learnSkills === "") {
    message.innerText = "Please fill both skill boxes.";
    return;
  }

  const teachArray = teachSkills.split(",").map(s => s.trim());
  const learnArray = learnSkills.split(",").map(s => s.trim());

  /* NEW LINES ADDED */

  const level = document.getElementById("teachLevel").value;
  const category = document.getElementById("teachCategory").value;

  try {

    await setDoc(doc(db, "users", user.uid), {
      teach: teachArray,
      learn: learnArray,
      level: level,
      category: category
    });

    message.innerText = "Skills saved successfully.";

  } catch (error) {

    console.error(error);
    message.innerText = "Error saving skills.";

  }

};


onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "/";
  }

});