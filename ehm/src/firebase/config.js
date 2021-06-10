import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB44EVRYPqkpsrlkdlz8kTDRu_lg7GC-HE",
  authDomain: "engineeringhistoricalmem-27d5c.firebaseapp.com",
  projectId: "engineeringhistoricalmem-27d5c",
  storageBucket: "engineeringhistoricalmem-27d5c.appspot.com",
  messagingSenderId: "374238412862",
  appId: "1:374238412862:web:3fd9e1a90526ffca76d16f",
  measurementId: "G-LWC9JLGCVS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();
const perf = firebase.performance();
const analytics = firebase.analytics();

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
  projectStorage,
  projectFirestore,
  timestamp,
  auth,
  perf,
  analytics,
  googleProvider,
  facebookProvider,
};
