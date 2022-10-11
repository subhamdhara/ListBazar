// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = ;


const app = firebase.initializeApp({
  apiKey: "AIzaSyCyKsvC155tVtCn-JlxjPAucqIw9oTVoWc",
  authDomain: "shopping-list-379ee.firebaseapp.com",
  projectId: "shopping-list-379ee",
  storageBucket: "shopping-list-379ee.appspot.com",
  messagingSenderId: "266936637272",
  appId: "1:266936637272:web:f465e9f3c99b936727772d"
});
const db = app.firestore()
const auth = firebase.auth()

export {db, auth}