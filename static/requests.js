import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
getDocs,
query,
where,
updateDoc,
doc
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


onAuthStateChanged(auth, async (user) => {

if (!user) {
alert("Please login first");
window.location.href = "/";
return;
}


/* ================= INCOMING REQUESTS ================= */

const incomingQuery = query(
collection(db, "requests"),
where("to", "==", user.uid)
);

const incomingSnapshot = await getDocs(incomingQuery);

const incomingBox = document.getElementById("incomingRequests");
incomingBox.innerHTML = "";

if (incomingSnapshot.empty) {
incomingBox.innerHTML = "No incoming requests.";
}

incomingSnapshot.forEach((docItem) => {

const data = docItem.data();
const div = document.createElement("div");

const text = document.createElement("p");
text.innerText = "Someone requested a skill exchange with you";

const status = document.createElement("p");
status.innerHTML = "Status: <b>" + data.status + "</b>";

div.appendChild(text);
div.appendChild(status);


/* VIEW PROFILE BUTTON */

const profileBtn = document.createElement("button");
profileBtn.innerText = "View Profile";

profileBtn.onclick = function(){

window.location.href="/view-profile?user="+data.from;

};

div.appendChild(profileBtn);


/* ACCEPT / REJECT */

if (data.status === "pending") {

const acceptBtn = document.createElement("button");
acceptBtn.innerText = "Accept";

const rejectBtn = document.createElement("button");
rejectBtn.innerText = "Reject";


acceptBtn.onclick = async function () {

await updateDoc(doc(db,"requests",docItem.id),{
status:"accepted"
});

alert("Request Accepted");
location.reload();

};


rejectBtn.onclick = async function () {

await updateDoc(doc(db,"requests",docItem.id),{
status:"rejected"
});

alert("Request Rejected");
location.reload();

};


div.appendChild(acceptBtn);
div.appendChild(rejectBtn);

}


/* OPEN CHAT */

if (data.status === "accepted") {

const chatBtn = document.createElement("button");
chatBtn.innerText = "Open Chat";

chatBtn.onclick = function(){

window.location.href="/chat?user="+data.from;

};

div.appendChild(chatBtn);

}

const hr = document.createElement("hr");
div.appendChild(hr);

incomingBox.appendChild(div);

});


/* ================= SENT REQUESTS ================= */

const sentQuery = query(
collection(db,"requests"),
where("from","==",user.uid)
);

const sentSnapshot = await getDocs(sentQuery);

const sentBox = document.getElementById("sentRequests");
sentBox.innerHTML="";

if(sentSnapshot.empty){
sentBox.innerHTML="You have not sent any requests yet.";
}

sentSnapshot.forEach((docItem)=>{

const data = docItem.data();
const div = document.createElement("div");

const text = document.createElement("p");
text.innerText="You sent a skill exchange request";

const status = document.createElement("p");
status.innerHTML="Status: <b>"+data.status+"</b>";

div.appendChild(text);
div.appendChild(status);


/* VIEW PROFILE BUTTON */

const profileBtn=document.createElement("button");
profileBtn.innerText="View Profile";

profileBtn.onclick=function(){

window.location.href="/view-profile?user="+data.to;

};

div.appendChild(profileBtn);


if(data.status==="accepted"){

const chatBtn=document.createElement("button");
chatBtn.innerText="Open Chat";

chatBtn.onclick=function(){

window.location.href="/chat?user="+data.to;

};

div.appendChild(chatBtn);

}

const hr=document.createElement("hr");
div.appendChild(hr);

sentBox.appendChild(div);

});

});