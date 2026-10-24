import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2xcf2taSw33b71GJfxXqkXktYrZJYmko",
    authDomain: "luxe-homes-3fb66.firebaseapp.com",
    projectId: "luxe-homes-3fb66",
    storageBucket: "luxe-homes-3fb66.firebasestorage.app",
    messagingSenderId: "250285840798",
    appId: "1:250285840798:web:e789b362cd8b3899be5e8f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);