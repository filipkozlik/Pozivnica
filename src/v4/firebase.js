// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAbhi55TBonmkVvhiHq1lLEM0kH0S9ego0",
//   authDomain: "doloresfilipwedding-invite.firebaseapp.com",
//   databaseURL: "https://doloresfilipwedding-invite.firebaseio.com",
//   projectId: "doloresfilipwedding-invite",
//   storageBucket: "doloresfilipwedding-invite.appspot.com",
//   messagingSenderId: "604159876339",
//   appId: "1:604159876339:web:27c72b25750b817430eb86",
//   measurementId: "G-45H3V0J7HP",
// };

// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// export const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export default firebase;

// export default { auth, db };

// import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyAbhi55TBonmkVvhiHq1lLEM0kH0S9ego0",
//   authDomain: "doloresfilipwedding-invite.firebaseapp.com",
//   databaseURL: "https://doloresfilipwedding-invite.firebaseio.com",
//   projectId: "doloresfilipwedding-invite",
//   storageBucket: "doloresfilipwedding-invite.appspot.com",
//   messagingSenderId: "604159876339",
//   appId: "1:604159876339:web:27c72b25750b817430eb86",
//   measurementId: "G-45H3V0J7HP",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import  { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbhi55TBonmkVvhiHq1lLEM0kH0S9ego0",
  authDomain: "doloresfilipwedding-invite.firebaseapp.com",
  databaseURL: "https://doloresfilipwedding-invite.firebaseio.com",
  projectId: "doloresfilipwedding-invite",
  storageBucket: "doloresfilipwedding-invite.appspot.com",
  messagingSenderId: "604159876339",
  appId: "1:604159876339:web:27c72b25750b817430eb86",
  measurementId: "G-45H3V0J7HP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const storage = getStorage(app);
export default db;
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
