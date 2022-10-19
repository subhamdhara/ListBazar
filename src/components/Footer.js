// import { FaTrash, FaCheck } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/compat/app";

// import React from 'react'
// import {collection, getDocs} from 'firebase/compat/firestore'
// import { CgClose } from "react-icons/cg";
import "./Footer.css";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

function Footer() {
  const [itemName, setItemName] = useState([]);
  const [cate, setCate] = useState([]);
  const [category, setCategory] = useState([]);
  let cid = 0
  // items.map(({id, item, taken}) => {
  //   console.log(taken)
  // })
  const moref = useRef()

  useEffect(() => {
    db.collection("category")
      .limit(50)
      .onSnapshot((snapshot) => {
        setCate(snapshot.docs.map((doc) => doc.data()));
        // snapshot.docs.map((doc) => console.log(doc.id))
      });
  }, []);

  async function addItem(e) {
    e.preventDefault();
    // document.getElementById('w').innerHTML=<Modal></Modal>
    moref.current.open()
    const {uid} = auth.currentUser
    await db
      .collection("list")
      .add({
        item: itemName,
        taken: false,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

  }
  async function addItemCategory(e) {
    e.preventDefault();
    // document.getElementById('w').innerHTML=<Modal></Modal>
    moref.current.close()
    const {uid} = auth.currentUser
    cate.forEach((a) => {if (a.category === category){cid = a.id}})
    await db
      .collection("userSuggestion")
      .add({
        item: String(itemName).split(" ")[String(itemName).split(" ").length - 1],
        category: category,
        uid,
        categoryId: cid,
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

      <Modal ref={moref}>
      <form onSubmit={addItemCategory} className="category">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value.toLowerCase())}
          placeholder="category"
        />
        <button type="submit">done</button>
      </form>
      </Modal>

    </footer>
    
    
  );
}
const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return{
      open: () => setOpen(true),
      close: () => setOpen(false)
    }
  })

  return(
    <AnimatePresence>
     {open && (
       <>
       <motion.div className="modal-back" 
       initial={{ scale: 0, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20,
       }}
       exit={{ scale: 0, opacity: 0 }}>
       <motion.div className="modal-container"
       initial={{ scale: 0, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20,
         delay: 1
       }}
       exit={{ scale: 0, opacity: 0 }}>
         <motion.div className="modal-content" 
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{
           type: "spring",
           stiffness: 260,
           damping: 20,
           delay: 1.5
         }}
         exit={{ scale: 0, opacity: 0 }}>
           {props.children}
         </motion.div>
       </motion.div>
       </motion.div>
       </>
     )}
    </AnimatePresence>
  )

})


export default Footer;
