import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKYvcePSAzfbPDx7XufESwtpsc8hKZwmQ",
  authDomain: "awddaaw.firebaseapp.com",
  projectId: "awddaaw",
  storageBucket: "awddaaw.firebasestorage.app",
  messagingSenderId: "1031406067259",
  appId: "1:1031406067259:web:6fcb09c4b584a1e08d861e",
  measurementId: "G-5NVZWV6DXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
