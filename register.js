// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
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

//inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const name = document.getElementById('name').value;
const confirmPassword = document.getElementById('repeat_password').value;

//submit button
const submit = document.getElementById('submit');
submit.addEventListener('click',function(event){
  event.preventDefault()
  
//inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('repeat_password').value;
const name = document.getElementById('name').value;

// Compare the values of the two password fields
if (password !== confirmPassword) {
    alert('Wachtwoorden matchen niet!');
    return;
  }

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account maken...");

      const user = userCredential.user; // Access the actual user object
      updateProfile(user, { displayName: name }) // Update the profile with name
        .then(() => {
          console.log('User profile updated with displayName:', name);
          // ... continue with redirection or other actions ...
        })
        .catch((error) => {
          console.error('Error updating user profile:', error);
          // Handle the error appropriately
        });

      // Add user data to Firestore after alert, using async/await for clarity
      (async () => {
        try {
          const customID = userCredential.user.uid;
          const docRef = doc(db, 'users', customID);
          await setDoc(docRef, {
            name: name,
            email: email
          });

          console.log('User data saved:', customID);
          localStorage.setItem('uid', user.uid);
          localStorage.setItem('name', name);
          window.location.href = 'home.html';
        } catch (error) {
          console.error('Error saving user data:', error);
          alert('Account maken mislukt. Error:' + error.message);
        }
      })();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})