// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8eLvYLNx-KQE2eCAMyrYoGI0HQnd9nog",
  authDomain: "group-pay-1e925.firebaseapp.com",
  databaseURL: "https://group-pay-1e925-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "group-pay-1e925",
  storageBucket: "group-pay-1e925.appspot.com",
  messagingSenderId: "760041501667",
  appId: "1:760041501667:web:0480a36f3f6075066a26d6",
  measurementId: "G-83WLP5JSP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const db = getFirestore();

let button = document.getElementById("button");

async function AddDocument_AutoID(){
    var ref = collection(db,"test");

    const user = currentUser(auth);

    const customID = user.uid;

    const docRef = doc(ref, customID);

    setDoc(docRef, {
        name: "jaja"
      })
      .then(() => {
        alert("Data successfully toegevoegd");
      })
      .catch((error) => {
        alert("Mislukt, error: " + error);
      });
}

button.addEventListener("click", AddDocument_AutoID);