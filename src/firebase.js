import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import {  getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB72CeXlMRsUg-y1n0M-fBpZ56W_BIMgkA",
    authDomain: "chat-89db2.firebaseapp.com",
    projectId: "chat-89db2",
    storageBucket: "chat-89db2.appspot.com",
    messagingSenderId: "355417891103",
    appId: "1:355417891103:web:bf6a4bb86be7e4f26d902a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
