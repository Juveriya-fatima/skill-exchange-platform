import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
query,
onSnapshot
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


/* GET OTHER USER */

const params = new URLSearchParams(window.location.search);
const otherUser = params.get("user");

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");

let currentUser;


/* WAIT FOR LOGIN */

onAuthStateChanged(auth,(user)=>{

if(!user){
alert("Please login first");
window.location.href="/";
return;
}

currentUser=user;

loadMessages();

});


/* SEND MESSAGE */

sendBtn.addEventListener("click",async()=>{

if(!currentUser || !otherUser) return;

const text = msgInput.value.trim();

if(text==="") return;

await addDoc(collection(db,"messages"),{

from:currentUser.uid,
to:otherUser,
text:text

});

msgInput.value="";

});


/* LOAD MESSAGES */

function loadMessages(){

const q = query(collection(db,"messages"));

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML="";

snapshot.forEach((docItem)=>{

const data = docItem.data();

if(
(data.from===currentUser.uid && data.to===otherUser) ||
(data.from===otherUser && data.to===currentUser.uid)
){

const p=document.createElement("p");

p.innerText =
data.from===currentUser.uid
? "You: "+data.text
: "Partner: "+data.text;

messagesDiv.appendChild(p);

}

});

});

}

const startSessionBtn = document.getElementById("startSession");

if(startSessionBtn){

startSessionBtn.onclick = () => {

const params = new URLSearchParams(window.location.search);
const otherUser = params.get("user");

const roomId = "skill-session-" + otherUser;

const meetLink = "https://meet.jit.si/" + roomId;

window.open(meetLink, "_blank");

};

}