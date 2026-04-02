import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
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
const auth = getAuth(app);
const db = getFirestore(app);


const saveBtn = document.getElementById("saveProfile");


/* SAVE PROFILE */

saveBtn.onclick = async () => {

const user = auth.currentUser;

if(!user){
alert("Login first");
return;
}

const name = document.getElementById("name").value;
const college = document.getElementById("college").value;
const branch = document.getElementById("branch").value;
const bio = document.getElementById("bio").value;
const availability = document.getElementById("availability").value;

try{

await setDoc(doc(db,"profiles",user.uid),{

name:name,
college:college,
branch:branch,
bio:bio,
availability:availability

});

document.getElementById("msg").innerText="Profile saved successfully";

}catch(error){

console.error(error);
document.getElementById("msg").innerText="Error saving profile";

}

};


/* LOAD PROFILE DATA WHEN PAGE OPENS */

async function loadProfile(){

const user = auth.currentUser;

if(!user) return;

const docRef = doc(db,"profiles",user.uid);
const docSnap = await getDoc(docRef);

if(docSnap.exists()){

const data = docSnap.data();

document.getElementById("name").value = data.name || "";
document.getElementById("college").value = data.college || "";
document.getElementById("branch").value = data.branch || "";
document.getElementById("bio").value = data.bio || "";
document.getElementById("availability").value = data.availability || "";

}

}


/* WAIT FOR USER LOGIN */

auth.onAuthStateChanged((user)=>{

if(user){
loadProfile();
}

});