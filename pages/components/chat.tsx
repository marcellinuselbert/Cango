import React, { useState } from "react";
import firebase from "firebase/app";
import firebaseConfig from "../../utils/firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import SignOut from "./signout";
import { Chat } from "../../models/Chats";
import { groupByDate } from "../../models/groupByDate";
import Loading from "./loading";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth: any = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const spanRef = React.useRef<null | HTMLElement>(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [list_chats, isLoading] = useCollectionData<Chat>(query, {
    idField: "id",
  });
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

  groupArrays.map((msg) => {
    console.log(msg);
  });

  return (
    <>
      {!isLoading ? (
        <div className="animate-fade-in">
          <header className="bg-gray-700 lg:rounded-none rounded-t-lg">
            <div className="grid grid-cols-2 h-20">
              <div className="mt-2 ml-5 animate-fade-in-title">
                <div className=" text-3xl text-white">Cango </div>
                <div className="text-xl text-gray-300">
                  by Marcellinus Elbert
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <SignOut />
              </div>
            </div>
          </header>

          <div>
            <div className="lg:h-up h-ext overflow-y-scroll bg-gray-300">
              {
                /* eslint-disable */
                groupArrays &&
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
                  ))
              }{" "}
              <span ref={spanRef}></span>
            </div>
            <form onSubmit={sendMessage} className="flex justify-end">
              <TextField
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder="Enter a message"
                className="w-full bg-white"
                variant="filled"
              />
              {/* <button className="bg-blue-500" disabled={!formValue}>
              <p>Enter</p>
            </button> */}
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
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
