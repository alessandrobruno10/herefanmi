import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe3VWR-BjTcCXZ_PVWXnBKFR6or84AL8Q",
  authDomain: "first-firebase-7e1ee.firebaseapp.com",
  projectId: "first-firebase-7e1ee",
  storageBucket: "first-firebase-7e1ee.appspot.com",
  messagingSenderId: "539558198657",
  appId: "1:539558198657:android:3d430c8ea335c830567c80"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Auth provider
export const GoogleProvider = new GoogleAuthProvider();
export const FacebookProvider = new FacebookAuthProvider();
export const MicrosoftProvider = new OAuthProvider('microsoft.com');
export const AppleProvider = new OAuthProvider('apple.com');

export default app;