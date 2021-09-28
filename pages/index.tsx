import Login from "../components/login";
import ChatRoom from "../components/chat";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import firebaseConfig from "../utils/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export default function Home() {
  const [user] = useAuthState(auth);
  {
    /*once logged in the user has object value*/
  }

  return (
    <>
      {
        <div className="flex justify-center  h-screen animate-color-change-2x">
          <div className="w-full overflow-hidden">
            <div>
              <section>{user ? <ChatRoom /> : <Login />}</section>{" "}
              {/*ChatRoom will not pop up unless the user has value. before log in user value is null*/}
            </div>
          </div>
        </div>
      }
    </>
  );
}
