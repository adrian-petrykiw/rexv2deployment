import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxgHZsgubU8_rXXISEnWkjvqCrdqumAgI",
    authDomain: "todo-app-7da7d.firebaseapp.com",
    projectId: "todo-app-7da7d",
    storageBucket: "todo-app-7da7d.appspot.com",
    messagingSenderId: "375869410092",
    appId: "1:375869410092:web:421853fbf9524a546e3a89",
    measurementId: "G-NGNNDWCY3G"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }