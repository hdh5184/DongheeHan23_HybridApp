
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCyWiKK9RJCOyDGIh-14YO99aYuNYa2yWM",
authDomain: "hybridapp2023-51592.firebaseapp.com",
projectId: "hybridapp2023-51592",
storageBucket: "hybridapp2023-51592.appspot.com",
messagingSenderId: "833940080458",
appId: "1:833940080458:web:9e2e96b553af1a04b2a3b3",
measurementId: "G-ZTGDE4QK0P"
};
        
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);