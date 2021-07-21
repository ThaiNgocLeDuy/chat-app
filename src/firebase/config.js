import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCW6MCT3MKyPokGkyGUCvLroqrLbR6I7_Q",
  authDomain: "chat-app-160a6.firebaseapp.com",
  projectId: "chat-app-160a6",
  storageBucket: "chat-app-160a6.appspot.com",
  messagingSenderId: "295903153661",
  appId: "1:295903153661:web:2788e9bc8df7ae24661d94",
  measurementId: "G-7ZH3D2MNR1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator("http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8080")
// }

export { db, auth };

export default firebase;
