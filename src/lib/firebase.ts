// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvrPCoAOWdrcjiguFuK5VUcPemWxTurrg",
    authDomain: "brandblitz-alpha.firebaseapp.com",
    databaseURL: "https://brandblitz-alpha-default-rtdb.firebaseio.com",
    projectId: "brandblitz-alpha",
    storageBucket: "brandblitz-alpha.firebasestorage.app",
    messagingSenderId: "70230956659",
    appId: "1:70230956659:web:454f1e3fbe2ba3fa6ee806",
    measurementId: "G-MMN3D4555Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);