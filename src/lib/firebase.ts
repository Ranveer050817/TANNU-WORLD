/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import autoConfig from '../../firebase-applet-config.json';

// For external deployments (e.g. Netlify), we use environment variables.
// In the AI Studio preview environment, we fall back to the auto-generated config.
const customConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isCustomProject = !!customConfig.apiKey;
const finalConfig = isCustomProject ? customConfig : autoConfig;

const app = initializeApp(finalConfig);

export const db = (!isCustomProject && autoConfig.firestoreDatabaseId)
  ? getFirestore(app, autoConfig.firestoreDatabaseId)
  : getFirestore(app); 
  
export const auth = getAuth(app);
export const storage = getStorage(app);
