import { getDatabase, ref, set, child, get } from 'firebase/database';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: "AIzaSyALz-d4tu-HqbGlOsg5MXTU1RrKuD72hcY",
    authDomain: "prueba-1ef45.firebaseapp.com",
    databaseURL: "https://prueba-1ef45-default-rtdb.firebaseio.com",
    projectId: "prueba-1ef45",
    storageBucket: "prueba-1ef45.appspot.com",
    messagingSenderId: "365702644466",
    appId: "1:365702644466:web:8e3db81a98353e1716066b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export { app, db }