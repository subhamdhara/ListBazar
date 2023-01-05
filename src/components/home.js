import { FaTrash, FaCheck } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import Footer from "./Footer";
import { CgClose } from "react-icons/cg";
import "./home.css";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import SignOut from "./signOut";
import TabView from "./TabView";

const cardVariants: Variants = {
  offscreen: {
    x: "100vw",
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

function Home() {
  const [items, setItems] = useState([]);
  const { uid } = auth.currentUser;
  const [cate, setCate] = useState([]);
  const [toggleState, setToggleState] = useState([]);

  //   console.log(uid)



  useEffect(() => {
    db.collection("category")
      .limit(50)
      .onSnapshot((snapshot) => {
        setCate(snapshot.docs.map((doc) => doc.data()));
        // snapshot.docs.map((doc) => console.log(doc.id))
      });
  }, []);
  var ctest = [];

  cate.map((cat) => {
    const ic = String(cat.category);
    var o = ic
    ctest.push([]);
  });

  const toggle = (index) => {
    setToggleState(index);
  };
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
    db.collection("list").doc(id).delete();
  };
  const updatetaken = async (id, data) => {
    db.collection("list").doc(id).update({ taken: data });
  };
  // items.map(({id, item, taken}) => {
  //   console.log(taken)
  // })
  // console.log(items.item)
  //   order(items)
  

  // const ctest0 = ctest[0];
  // console.log(ctest0["grocery"])

  items.map((i) => {
    ctest[i.data().categoryId].push(i)
    // ctest[0]
    // ctest[0]["grocery"][0]
    // ctest0["grocery"].
    // console.log(i.data().category)
    // ctest
  });
  var lis = []
  cate.map((cat)=>{
    lis.push({name:cat.category, content:<ul>
      {ctest[cat.id].map((doc) => (
        <motion.li
          key={doc.id}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div
            variants={cardVariants}
            className={`${doc.data().taken ? "taken" : "not-taken"}`}
          >
            <motion.button
              onClick={() => delte(doc.id)}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaTrash />
            </motion.button>
            {doc.data().itemShowName}
            <motion.button
              onClick={
                doc.data().taken
                  ? () => updatetaken(doc.id, false)
                  : () => updatetaken(doc.id, true)
              }
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {doc.data().taken ? <CgClose /> : <FaCheck />}
            </motion.button>
          </motion.div>
        </motion.li>
      ))}
    </ul>})
  })
  console.log(lis)


  return (
    <div className="Home">
      <header>
        <h1>ListBazar</h1>
        <SignOut />
      </header>
      <TabView
        tabs={lis}
      />

      {/* <ul>
        {items.map((doc) => (
          <motion.li
            key={doc.id}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div
              variants={cardVariants}
              className={`${doc.data().taken ? "taken" : "not-taken"}`}
            >
              <motion.button
                onClick={() => delte(doc.id)}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <FaTrash />
              </motion.button>
              {doc.data().itemShowName}
              <motion.button
                onClick={
                  doc.data().taken
                    ? () => updatetaken(doc.id, false)
                    : () => updatetaken(doc.id, true)
                }
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {doc.data().taken ? <CgClose /> : <FaCheck />}
              </motion.button>
            </motion.div>
          </motion.li>
        ))}
      </ul> */}
      <Footer />
    </div>
  );
}

export default Home;
