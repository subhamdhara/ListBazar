// import { FaTrash, FaCheck } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/compat/app";

// import React from 'react'
// import {collection, getDocs} from 'firebase/compat/firestore'
// import { CgClose } from "react-icons/cg";
import "./Footer.css";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function Footer() {
  const [itemName, setItemName] = useState([]);
  const [cate, setCate] = useState([]);
  let cid = 0;
  // items.map(({id, item, taken}) => {
    //   console.log(taken)
    // })
    const moref = useRef();
    
    useEffect(() => {
      db.collection("category")
      .limit(50)
      .onSnapshot((snapshot) => {
        setCate(snapshot.docs.map((doc) => doc.data()));
        // snapshot.docs.map((doc) => console.log(doc.id))
      });
    }, []);
    // console.log(cate[0]["category"])
    
    async function addItem(e) {
    e.preventDefault();
    moref.current.close();

    cate.forEach((a) => {
      if (a.category === category) {
        cid = a.id;

      }
    });
    // document.getElementById('w').innerHTML=<Modal></Modal>
    const { uid } = auth.currentUser;
    await db.collection("list").add({
      itemShowName: itemName,
      itemMainName: String(itemName).split(" ")[String(itemName).split(" ").length - 1].toLowerCase(),
      taken: false,
      uid,
      category: category,
      categoryId: cid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // console.log(category)
    setItemName("");
  }
  // console.log(cate)
  const [category, setCategory] = useState('medicine');
  return (
    
    <footer className="Footer">
      <form
        onSubmit={(e) => {
          moref.current.open();
          e.preventDefault();
        }}
      >
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="item you want to create"
          />
        <button type="submit">create</button>
      </form>

      <Modal ref={moref}>
        <form onSubmit={addItem} className="category">
        <select
        id="cars"
        onChange={(e) => setCategory(e.target.value.toLowerCase())}
      >
        {cate.map((categoryn) => 
          <option value={categoryn.category}>{categoryn.category}</option>
        )}
      </select>
          <button type="submit">done</button>
        </form>
      </Modal>
      
    </footer>
  );
}
const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="modal-back"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              className="modal-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1,
              }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.5,
                }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {props.children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Footer;
