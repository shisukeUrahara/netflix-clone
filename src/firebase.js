import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMYhjO78Y3QGfiR4Q8wojS4BSDI0b-EcU",
  authDomain: "netflix-clone-802b1.firebaseapp.com",
  projectId: "netflix-clone-802b1",
  storageBucket: "netflix-clone-802b1.appspot.com",
  messagingSenderId: "282358624815",
  appId: "1:282358624815:web:c297c21c0ac97bba2cccda",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// accessing and using the firestore
const db = app.firestore();
const storage = firebase.storage();
const auth = firebase.auth(app);
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, provider, auth };
