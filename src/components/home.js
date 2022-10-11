import { FaTrash, FaCheck } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import Footer from "./Footer";
import { CgClose } from "react-icons/cg";
import "./home.css";
import React, { useEffect, useState } from "react";
import SignOut from "./signOut";

function Home() {
  const [items, setItems] = useState([]);
  const {uid} = auth.currentUser
//   console.log(uid)

  useEffect(() => {
    db.collection("list")
      .where("uid", "==", uid)
    //   .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) => {
        setItems(snapshot.docs.map((doc) => doc));
        // snapshot.docs.map((doc) => console.log(doc.id))
      });
  }, []);

//   const order = (data, field) => {
//       items.sort
//   }

  const delte = async (id) => {
    db.collection('list').doc(id).delete()
  }
  const updatetaken = async (id, data) => {
    db.collection('list').doc(id).update({taken: data})
  }
  // items.map(({id, item, taken}) => {
  //   console.log(taken)
  // })
  // console.log(items.item)
//   order(items)
  return (
    <div className="Home">
      <header>
        <h1>ListBazar</h1>
        <SignOut/>
      </header>
      <ul>
        {items.map((doc) => (
          <li className={`${doc.data().taken ? "taken" : "not-taken"}`} key={doc.id}>
            <button onClick = {() => delte(doc.id)}>
              <FaTrash />
            </button>
            {doc.data().item}
            <button onClick={doc.data().taken ? () => updatetaken(doc.id, false) : () => updatetaken(doc.id, true)}>{doc.data().taken ? <CgClose /> : <FaCheck />}</button>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default Home;
