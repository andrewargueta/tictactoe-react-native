import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhBl-xrvGc1FHBTsM-9_m_M2EOFRQk4LM",
    authDomain: "rn-app-ded6a.firebaseapp.com",
    projectId: "rn-app-ded6a",
    storageBucket: "rn-app-ded6a.appspot.com",
    messagingSenderId: "428065091912",
    appId: "1:428065091912:web:77e6457a231e05a270c37d",
    measurementId: "G-71TYCCH8PD"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase ;