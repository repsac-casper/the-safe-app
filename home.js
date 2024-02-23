// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs
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

const uid = localStorage.getItem('uid');
const name = localStorage.getItem('name');

if (name) {
    document.getElementById('welkom').textContent = `Welkom, ${name}!`;
  } else {
    document.getElementById('welkom').textContent = 'Leuk dat je er bent maar er is toch nog wat mis gegaan :(';
  }

// Fetch the user document and extract group IDs
const docRef = doc(db, 'users', uid);

// Retrieve the document
getDoc(docRef)
  .then((docSnapshot) => {
    if (docSnapshot.exists()) {
      // Access the array field within the document
      const groupsArray = docSnapshot.data().groups;
      
      // Reference to the container where the second cards will be appended
      const secondContainer = document.querySelector('.second_groepen');
      
      // Reference to the original second_card div
      const originalSecondCard = document.querySelector('.second_card');
      originalSecondCard.remove();

      // Loop through the array of group IDs
      groupsArray.forEach((groupId) => {
        // Get a reference to the group document
        const groupDocRef = doc(db, 'groups', groupId);

        // Retrieve the group document
        getDoc(groupDocRef)
          .then((groupDocSnapshot) => {
            if (groupDocSnapshot.exists()) {
              // Access the 'name' field within the group document
              const groupName = groupDocSnapshot.data().name;
              
              // Clone the original second_card div
              const clonedSecondCard = originalSecondCard.cloneNode(true);

              // Set the group name in the cloned second_card div
              const secondName = clonedSecondCard.querySelector('#second_name');
              secondName.textContent = groupName;
              secondName.id = `second_name_${groupId}`;

              // Add an event listener to the link in the cloned second_card div
              const link = clonedSecondCard.querySelector('a');
              link.addEventListener('click', (event) => {
                  // Save group name and ID to localStorage before redirecting
                  localStorage.setItem('selectedGroupName', groupName);
                  localStorage.setItem('selectedGroupId', groupId);
              });

              // Append the cloned second_card to the secondContainer
              secondContainer.appendChild(clonedSecondCard);
            } else {
              console.log('No such group document with ID:', groupId);
            }
          })
          .catch((error) => {
            console.error('Error getting group document:', error);
          });
      });
    } else {
      console.log('No such document!');
    }
  })
  .catch((error) => {
    console.log('Error getting document:', error);
  });
