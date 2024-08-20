import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0t9bO4j9Jp20SmXFNrkf98ddjAFasvus",
  authDomain: "pet-adopt-ef496.firebaseapp.com",
  projectId: "pet-adopt-ef496",
  storageBucket: "pet-adopt-ef496.appspot.com",
  messagingSenderId: "482739722394",
  appId: "1:482739722394:web:f6f3b546556af8e554e723",
  measurementId: "G-W141SFTWDE",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
let auth;

if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}
export { app, auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
