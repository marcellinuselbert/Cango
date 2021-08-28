import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SignOut from "./signout";
import {Chat} from "../../models/Chats"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyATUuodX6YGR_hSGiiGsrCbTwuCfzLbsGc",
    authDomain: "chat-next-task.firebaseapp.com",
    projectId: "chat-next-task", 
    storageBucket: "chat-next-task.appspot.com",
    messagingSenderId: "818088000542",
    appId: "1:818088000542:web:81034c0e162816ddf1420f",
    measurementId: "G-P7999VGY6S",
  });
}

const auth:any = firebase.auth();
const firestore = firebase.firestore();


  function ChatRoom() {
    const spanRef = React.useRef<null | HTMLElement>(null);
    
    const messagesRef = firestore.collection("messages");

    const query = messagesRef.orderBy("createdAt");
    
    const [messages,loading]= useCollectionData<Chat>(query, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    console.log(loading)
    const sendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('hello')
      await messagesRef.add({
        //create text
        uid: auth.currentUser?.uid,
        photoURL: auth.currentUser?.photoURL,
        displayName: auth.currentUser?.displayName,
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // console.log(messages[0].createdAt)
      // const date: Date = messages.createdAt.toDate();
      // console.log(date)
      // const date = dateCreated.toDate().toDateString()
      // messages.map((message)=>{
      //   console.log(message)
      // })
      setFormValue("");
      spanRef.current?.scrollIntoView({ behavior: "smooth" });
      
      // console.log("hello");
     
    };

    
    return (
      <>
        {/* <main> */}
        <header className="bg-gray-700 rounded-t-lg grid grid-cols-2 h-20">
          <h1 className="mt-5 ml-5 text-3xl text-white">Cango</h1>
          <div className="flex justify-end mt-5">
            <SignOut />
          </div>
        </header>
        <div>
          <div className="lg:h-96 h-ext overflow-y-scroll bg-gray-100">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={spanRef}></span>
          </div>
          <form onSubmit={sendMessage} className="flex justify-end">
            <TextField
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="enter text"
              className="w-full"
              variant="filled"
            />
            <Button variant="contained" color="primary" disabled={!formValue}>
              <p>Enter</p>
            </Button>
          </form>
          {/* <p>{groupDate(messages)}</p> */}
        </div>
      </>
    );
  }
  function ChatMessage(props: {message: Chat}){
    const { text, uid, photoURL, createdAt, displayName,id } = props.message;
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    const className =
      uid === auth.currentUser.uid? "sentName" : "receivedName";

    return (
      <>
        {/* <div>
      {createdAt.toDate().getHours()}
    </div> */}
        <p className={`${className}`}>{displayName}</p>
        <div className={`message ${messageClass} m-2 flex mx-4`}>
          <img
            className="w-10 h-10 rounded-full"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
          <p className="p-2 px-3">{text}</p>
          <div className="mt-2">
          {addZeroBefore(createdAt?.toDate().getHours())}:{addZeroBefore(createdAt?.toDate().getMinutes())}
        </div>
        </div>
      </>
    );
  }
  function addZeroBefore(n: number) {
    return (n < 10 ? "0" : "") + n;
  }


// function groupDate(data:obj){
//   return data

// }
export default ChatRoom;
