import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
apiKey: "AIzaSyDt1EAPEp9h-eUs5aQRRwqGGS_HbJxvxnk",
authDomain: "skill-exchange-platform-46120.firebaseapp.com",
projectId: "skill-exchange-platform-46120",
storageBucket: "skill-exchange-platform-46120.firebasestorage.app",
messagingSenderId: "668802136174",
appId: "1:668802136174:web:644b5cdc3c1d9333408e7f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* GET USER ID FROM URL */

const params = new URLSearchParams(window.location.search);
const userId = params.get("user");


async function loadProfile(){

const profileBox = document.getElementById("profileBox");

if(!userId){
profileBox.innerHTML="User not found";
return;
}


/* GET SKILLS DATA */

const userRef = doc(db,"users",userId);
const userSnap = await getDoc(userRef);


/* GET PROFILE DATA */

const profileRef = doc(db,"profiles",userId);
const profileSnap = await getDoc(profileRef);


if(!userSnap.exists() && !profileSnap.exists()){
profileBox.innerHTML="Profile not found";
return;
}


const skills = userSnap.exists() ? userSnap.data() : {};
const profile = profileSnap.exists() ? profileSnap.data() : {};


profileBox.innerHTML = `

<h2>${profile.name || "User"}</h2>

<p><b>College:</b> ${profile.college || "Not added"}</p>

<p><b>Branch:</b> ${profile.branch || "Not added"}</p>

<p><b>About:</b> ${profile.bio || "No bio added"}</p>

<p><b>Availability:</b> ${profile.availability || "Not mentioned"}</p>

<hr>

<h3>Skills They Teach</h3>
<p>${skills.teach ? skills.teach.join(", ") : "Not added"}</p>

<h3>Skills They Want To Learn</h3>
<p>${skills.learn ? skills.learn.join(", ") : "Not added"}</p>

<h3>Skill Level</h3>
<p>${skills.level || "Not specified"}</p>

<h3>Skill Category</h3>
<p>${skills.category || "Not specified"}</p>

`;

}

loadProfile();