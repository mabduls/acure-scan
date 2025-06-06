// firebase.js
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC0E89l78RZxPmE-IUb7YIqhdx5WISs_1I",
    authDomain: "acurescan.firebaseapp.com",
    projectId: "acurescan",
    storageBucket: "acurescan.firebasestorage.app",
    messagingSenderId: "186282247086",
    appId: "1:186282247086:web:f2bd99f70e9886f8d2be3f",
    measurementId: "G-4XL97CL9NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ⚠️ REMOVE analytics
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    collection,
    doc,
    setDoc
};
