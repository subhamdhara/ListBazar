
import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/home";
import SignIn from "./components/SignIn";
import {auth} from './firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const [user] = useAuthState(auth)

  return(
    <>
      {user ? <Home/> : <SignIn/>}
    </>
  )
}

export default App;
