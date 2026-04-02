import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc
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


async function loadMatches(user) {

  const myDoc = await getDoc(doc(db, "users", user.uid));

  if (!myDoc.exists()) {
    document.getElementById("matchesList").innerHTML =
      "Please save your skills first.";
    return;
  }

  const myData = myDoc.data();
  const myLearn = myData.learn;

  const allUsers = await getDocs(collection(db, "users"));

  const list = document.getElementById("matchesList");
  list.innerHTML = "";

  allUsers.forEach((docItem) => {

    if (docItem.id === user.uid) return;

    const data = docItem.data();

   if (!data.teach || !data.learn) return;

const match = data.teach.some(skill => myLearn.includes(skill));

    if (match) {

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>Skill Partner</h3>
        <p><b>Can Teach:</b> ${data.teach.join(", ")}</p>
        <p><b>Wants To Learn:</b> ${data.learn.join(", ")}</p>
        <button class="reqBtn">Request Skill Exchange</button>
        <hr>
      `;

      const btn = div.querySelector(".reqBtn");

      btn.onclick = async () => {

        await addDoc(collection(db, "requests"), {
          from: user.uid,
          to: docItem.id,
          status: "pending"
        });

        alert("Request sent");

      };

      list.appendChild(div);

    }

  });

}


onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("Please login first");
    window.location.href = "/";
  } else {
    loadMatches(user);
  }

});