import firebase from "firebase";

var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

export default firebase;
