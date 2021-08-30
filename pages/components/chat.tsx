import React, { useState } from "react";
import firebase from "firebase/app";
import firebaseConfig from "../../utils/firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SignOut from "./signout";
import { Chat } from "../../models/Chats";
import { groupByDate } from "../../models/groupByDate";
import { isToday } from "date-fns";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
import { endOfYesterday } from "date-fns";

// var format = require("date-fns/format");
const auth: any = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const spanRef = React.useRef<null | HTMLElement>(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData<Chat>(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello");
    await messagesRef.add({
      //create text
      uid: auth.currentUser?.uid,
      photoURL: auth.currentUser?.photoURL,
      displayName: auth.currentUser?.displayName,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
    spanRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [list_chats] = useCollectionData<Chat>(query, { idField: "id" });
  console.log(list_chats);

  const groups = list_chats?.reduce(
    (listDate: Record<string, Partial<Chat[]>>, chat: Chat) => {
      const dd = String(chat.createdAt?.toDate().getDate()).padStart(2, "0");
      const mm = String(chat.createdAt?.toDate().getMonth() + 1).padStart(
        2,
        "0"
      );
      const yyyy = String(chat.createdAt?.toDate().getFullYear());

      const date: string = dd + "/" + mm + "/" + yyyy;
      if (!listDate[date]) {
        listDate[date] = [];
      }
      listDate[date].push(chat);
      return listDate;
    },
    {}
  );
  console.log({ groups });
  // // Edit: to add it in the array format instead
  const groupArrays: groupByDate[] = groups
    ? Object.keys(groups).map((date) => {
        return {
          date,
          chats: groups[date],
        };
      })
    : [];

  // console.log(groupArrays);
  groupArrays.map((msg) => {
    console.log(msg);
    // const chats = msg;
  });
  // console.log(chats);
  // console.log(groupArrays[0]);

  return (
    <>
      <div className="animate-shadow-drop-center">
        <header className="bg-gray-700 rounded-t-lg grid grid-cols-2 h-20">
          <h1 className="mt-5 ml-5 text-3xl text-white">Cango</h1>
          <div className="flex justify-end mt-5">
            <SignOut />
          </div>
        </header>
        <div>
          <div className="lg:h-96 h-ext overflow-y-scroll bg-gray-200">
            {/* {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)} */}
            {groupArrays &&
              groupArrays.map((byDates, index) => (
                <div>
                  <ChatDate key={index} dates={byDates} />
                  {byDates.chats?.map(
                    (msg) =>
                      msg !== undefined && (
                        <ChatMessage key={msg.id} message={msg} />
                      )
                  )}
                </div>
              ))}
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
        </div>
      </div>
    </>
  );
}
function ChatMessage(props: { message: Chat }) {
  const { text, uid, photoURL, createdAt, displayName, id } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const className = uid === auth.currentUser.uid ? "sentName" : "receivedName";

  return (
    <>
      <p className={`${className}`}>{displayName}</p>
      <div className={`message ${messageClass} m-2 flex mx-4`}>
        <img
          className="w-10 h-10 rounded-full"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="p-2 px-3">{text}</p>
        <div className="mt-2">
          {addZeroBefore(createdAt?.toDate().getHours())}:
          {addZeroBefore(createdAt?.toDate().getMinutes())}
        </div>
      </div>
    </>
  );
}

function ChatDate(props: { dates: groupByDate }) {
  const tanggal = props.dates.date;

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center my-5 w-28 h-10 bg-dateBubble rounded-lg">
        {tanggal}
      </div>
    </div>
  );
}

function addZeroBefore(n: number) {
  return (n < 10 ? "0" : "") + n;
}

export default ChatRoom;
