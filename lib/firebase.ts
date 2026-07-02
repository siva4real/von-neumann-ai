// Firebase client initialization.
// Note: these values are *public* client identifiers (they are shipped in the
// browser bundle by design and are safe to commit) — they are not secrets.
// Security is enforced by Firebase Auth authorized domains + backend rules.
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRNFlVqDZ2rk7dErmoxhlzJE5HCO2xYD8",
  authDomain: "von-neumann-ai.firebaseapp.com",
  projectId: "von-neumann-ai",
  storageBucket: "von-neumann-ai.firebasestorage.app",
  messagingSenderId: "229459574858",
  appId: "1:229459574858:web:7b1810434e32c884cb66b3",
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
// Always show the account chooser rather than silently reusing a session.
googleProvider.setCustomParameters({ prompt: "select_account" });
