// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js"
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
const db = getFirestore();

//groep naam laten zien
const selectedGroupName = localStorage.getItem('selectedGroupName');
document.getElementById('navbar_h1').textContent = selectedGroupName;

//qr code maken
// Retrieve the group ID from localStorage
const groupId = localStorage.getItem('selectedGroupId');
const uid = localStorage.getItem('uid');
// Get a reference to the img element
const qrImg = document.querySelector('.first_qr img');
// Construct the URL for the QR code using the Google Chart API
const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(groupId+"/"+uid)}`;
// Set the src attribute of the img element to the generated QR code URL
qrImg.src = qrCodeUrl;

//money laten zien
// Get a reference to the Firestore document for the current group
const groupDocRef = doc(db, 'groups', groupId);

// Retrieve the group document
getDoc(groupDocRef)
  .then((groupDocSnapshot) => {
    if (groupDocSnapshot.exists()) {
      // Access the 'money' field within the group document
      let money = groupDocSnapshot.data().money;

      // Format money to always have two decimal places
      money = parseFloat(money).toFixed(2);

      console.log('Formatted Money:', money);
      // Now you can use the 'money' variable as needed
      document.getElementById('first_money').textContent = `€${money}`;
    } else {
      console.log('No such group document with ID:', groupId);
    }
  })
  .catch((error) => {
    console.error('Error getting group document:', error);
  });

const share = document.getElementById('share');
share.addEventListener('click',function(event){
  event.preventDefault()

  navigator.share({
    title: selectedGroupName + ' delen.',
    text: "Je bent uitgenodigd voor " + selectedGroupName + "! Klik op de onderstaande link om deel te nemen.",
    url: 'https://betalen.thesafe.nl/uitnodiging/' + groupId,
  })
  .then(() => console.log('Shared successfully'))
  .catch((error) => console.error('Sharing failed:', error));
});