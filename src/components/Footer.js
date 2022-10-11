// import { FaTrash, FaCheck } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import firebase from "firebase/compat/app";

// import React from 'react'
// import {collection, getDocs} from 'firebase/compat/firestore'
// import { CgClose } from "react-icons/cg";
import "./Footer.css";
import React, { useEffect, useState } from "react";

function Footer() {
  const [itemName, setItemName] = useState([]);
  // items.map(({id, item, taken}) => {
  //   console.log(taken)
  // })
  async function addItem(e) {
    e.preventDefault();
    const {uid} = auth.currentUser
    await db
      .collection("list")
      .add({
        item: itemName,
        taken: false,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    setItemName("")
  }
  // console.log(items.item)
  return (
    <footer className="Footer">
      <form onSubmit={addItem}>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="item you want to create"
        />
        <button type="submit">create</button>
      </form>
    </footer>
  );
}

export default Footer;
