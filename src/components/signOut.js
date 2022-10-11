// import { FaTrash, FaCheck } from "react-icons/fa";
import { auth } from "../firebase-config";

function SignOut() {
  return (
    <div className="SignOut">
      <button onClick={() => {auth.signOut()}}>Sign Out</button>
    </div>
  );
}

export default SignOut;
