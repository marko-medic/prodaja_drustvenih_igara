/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REMOTE_API_KEY,
  authDomain: import.meta.env.VITE_REMOTE_DOMAIN,
  projectId: import.meta.env.VITE_REMOTE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REMOTE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REMOTE_SENDER_ID,
  appId: import.meta.env.VITE_REMOTE_APP_ID,
  measurementId: import.meta.env.VITE_REMOTE_MEASURMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export * from './helperi';
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
