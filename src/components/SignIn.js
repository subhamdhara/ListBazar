// import { FaTrash, FaCheck } from "react-icons/fa";
// import './SignIn.css'
import { db, auth } from "../firebase-config";
import firebase from "firebase/compat/app";

// import React from 'react'
// import {collection, getDocs} from 'firebase/compat/firestore'
// import { CgClose } from "react-icons/cg";
// import "./Footer.css";
import React, { useEffect, useState } from "react";

function SignIn() {
  function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
  }
  // console.log(items.item)
  return (
    <div className="SignIn">
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default SignIn;
