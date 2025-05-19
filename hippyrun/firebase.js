// Configuración e integración con Firebase

// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvRbMWv4TUwDPZGXsCWDUxkD7cPcw9v98",
  authDomain: "hippyrun.firebaseapp.com",
  projectId: "hippyrun",
  storageBucket: "hippyrun.firebasestorage.app",
  messagingSenderId: "1006542760096",
  appId: "1:1006542760096:web:6f9616ca50c7de917a81c5",
  databaseURL: "https://hippyrun-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child };
