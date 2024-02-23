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

const submitButton = document.getElementById('first_content_btn');
submitButton.addEventListener('click', async function(event){
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const groupName = nameInput.value;

  try {
    const docRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      users: 1,
      money: 0
    });

    console.log('Group made with ID:', docRef.id);

    // Save group ID and name to localStorage
    localStorage.setItem('selectedGroupName', groupName);
    localStorage.setItem('selectedGroupId', docRef.id);

    // Retrieve UID from localStorage
    const uid = localStorage.getItem('uid');
    if (!uid) {
      throw new Error('User UID not found in localStorage');
    }

    // Get reference to user document
    const userDocRef = doc(db, 'users', uid);

    // Fetch the user document
    const userDocSnap = await getDoc(userDocRef);

    // Check if the user document exists
    if (!userDocSnap.exists()) {
      throw new Error('User document does not exist');
    }

    // Update user document to add the new group ID to the "groups" array
    const userData = userDocSnap.data();
    const updatedGroups = userData.groups || [];
    updatedGroups.push(docRef.id);

    await updateDoc(userDocRef, {
      groups: updatedGroups
    });

    console.log('Document ID added to user\'s groups array');
    window.location.href = 'group.html';
  } catch (error) {
    console.error('Error making group:', error);
    alert('Groep maken mislukt. Error:' + error.message);
    window.location.href = 'home.html';
  }
});
