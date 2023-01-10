import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmOjKK68lmnoDjMNxx7993IADNGLzyEmw",
  authDomain: "fitfood-82b1b.firebaseapp.com",
  projectId: "fitfood-82b1b",
  storageBucket: "fitfood-82b1b.appspot.com",
  messagingSenderId: "1087232965362",
  appId: "1:1087232965362:web:4ebbb78c39f0ffda722e6b"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase.firestore().settings({ experimentalForceLongPolling: true });


export default firebase;
