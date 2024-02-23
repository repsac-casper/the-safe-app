// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
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

//inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

//submit button
const submit = document.getElementById('submit');
submit.addEventListener('click',function(event){
  event.preventDefault()
  
//inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Logging in...");
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('name', user.displayName);
    window.location.href = "home.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})