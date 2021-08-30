import Footer from "./components/footer";
import Login from "./components/login";
import ChatRoom from "./components/chat";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseConfig from "../utils/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
import Loading from "./components/loading";

export default function Home() {
  var isLoaded = false;
  const [user] = useAuthState(auth);
  // document.addEventListener("DOMContentLoaded", function () {
  //   isLoaded = true;
  // });
  // console.log(isLoaded);
  // useEffect(() => {
  //   if (document.readyState === "complete") {
  //     isLoaded = true;
  //   }
  // }, []);
  console.log(isLoaded);
  return (
    <>
      {!isLoaded ? (
        <div className="flex justify-center  h-screen animate-color-change-2x">
          <div className="w-full overflow-hidden">
            <div>
              <section>{user ? <ChatRoom /> : <Login />}</section>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
