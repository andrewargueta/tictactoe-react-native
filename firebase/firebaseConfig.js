import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhBl-xrvGc1FHBTsM-9_m_M2EOFRQk4LM",
  authDomain: "rn-app-ded6a.firebaseapp.com",
  projectId: "rn-app-ded6a",
  storageBucket: "rn-app-ded6a.appspot.com",
  messagingSenderId: "428065091912",
  appId: "1:428065091912:web:77e6457a231e05a270c37d",
  measurementId: "G-71TYCCH8PD"
};


let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { firebase, db, auth };