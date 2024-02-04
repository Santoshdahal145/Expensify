// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHRmNf_ztDHYcRUK4FUqtg_80SbPwGMr8",
  authDomain: "expensify-bc523.firebaseapp.com",
  projectId: "expensify-bc523",
  storageBucket: "expensify-bc523.appspot.com",
  messagingSenderId: "523876444283",
  appId: "1:523876444283:web:87ff2a76f0afae58ebdade"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth =getAuth(app);

export const tripsRef=collection(db,'trips')
export const expensesRef=collection(db,'expenses')

export default app;