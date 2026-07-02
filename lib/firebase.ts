// Firebase client initialization.
// Note: these NEXT_PUBLIC_* values are *public* client identifiers — they ship
// in the browser bundle by design and are not secrets. They're read from env so
// they aren't committed to source; real security is enforced by Firebase Auth
// authorized domains, an HTTP-referrer restriction on the API key, and backend
// (Firestore/Storage) rules.
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
// Always show the account chooser rather than silently reusing a session.
googleProvider.setCustomParameters({ prompt: "select_account" });
