import React, { useState } from "react";
import firebase from "firebase/app";
import firebaseConfig from "../utils/firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import SignOut from "./signout";
import { Chat } from "../models/Chats";
import { groupByDate } from "../models/groupByDate";
import Loading from "./loading";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth: any = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  {
    /*refer to span element*/
  }

  const messagesRef = firestore.collection("messages");
  {
    /*get collection messages from firestore db*/
  }
  const query = messagesRef.orderBy("createdAt");
  {
    /*order messages based on createdAt*/
  }
  const [list_chats, isLoading] = useCollectionData<Chat>(query, {
    idField: "id",
  });
  {
    /*based on created at query with ID parameter*/
  }
  const [formValue, setFormValue] = useState("");
  {
    /*set the variable formValue and setForm Value with empty string*/
  }
  const landingPageScroll = () => {
    if (isLoading == false) {
      spanRef.current?.scrollIntoView({ behavior: "smooth" }); //if loading is false then scroll
    }
  };
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    {
      /*prevent the the submit effect*/
    }

    await messagesRef.add({
      //create new collection
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: auth.currentUser?.uid,
      photoURL: auth.currentUser?.photoURL,
      displayName: auth.currentUser?.displayName,
      text: formValue,
    });
    setFormValue(""); //after sending messages input will be deleted

    spanRef.current?.scrollIntoView({ behavior: "smooth" });
    // spanRef.current?.scrollIntoView({ behavior: "smooth" }); //after submit scroll smoothly
  };
  console.log(list_chats);
  const groups = list_chats?.reduce(
    //list_chats array with object text, displayname etc.
    (listDate: Record<string, Partial<Chat[]>>, chat: Chat) => {
      //reduce is like forEach will map the list_chats into list_date and chat
      //Record function will assign key to string date and value to type list of chat model
      const dd = String(chat.createdAt?.toDate().getDate()).padStart(2, "0");
      const mm = String(chat.createdAt?.toDate().getMonth() + 1).padStart(
        2,
        "0"
      );
      const yyyy = String(chat.createdAt?.toDate().getFullYear());
      const date: string = dd + "/" + mm + "/" + yyyy; //set date
      if (!listDate[date]) {
        listDate[date] = []; //if new message is not same date add new list of date
      }
      listDate[date].push(chat); //if messages have the same date push chat to the same date
      return listDate;
    },
    {}
  );
  // // Edit: to add it in the array format instead
  const groupArrays: groupByDate[] = groups
    ? Object.keys(groups).map((date) => {
        return {
          date, //create object with key date and chats with value the messages from the same date
          chats: groups[date],
        };
      })
    : [];
  console.log(groupArrays);
  return (
    <>
      {!isLoading ? (
        <div
          className="animate-fade-in"
          onLoad={() => {
            landingPageScroll();
          }}
        >
          <header
            className="bg-gray-700 lg:rounded-none rounded-t-lg fixed top-0 w-full "
            style={{ zIndex: 2 }}
          >
            <div className="grid grid-cols-2 h-20">
              <div className="mt-2 ml-5 animate-fade-in-title">
                <div className=" text-3xl text-white">Cango </div>
                <div className="text-xl text-gray-300">by Marcellinus</div>
              </div>
              <div className="flex justify-end mt-5">
                <SignOut />
              </div>
            </div>
          </header>

          <div className="">
            <div className="h-screen overflow-y-scroll bg-gray-300 ">
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
            <form onSubmit={sendMessage} className="flex justify-end ">
              <div className="fixed bottom-0 w-full">
                <TextField
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="Enter a message"
                  className="w-full bg-white"
                  variant="filled"
                  required
                  // disabled={!formValue}
                />
              </div>

              {/* <button className="bg-gray-200 mr-5 w0" disabled={!formValue}>
                <p>Send</p>
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
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"; // if the uid and current UID is the same then pass sent to messageClass property
  const className = uid === auth.currentUser.uid ? "sentName" : "receivedName";
  var loaded = true;
  // console.log(createdAt);
  if (createdAt == null) {
    // if there's null then return loaded with false so in the html will return empty string
    console.log("hello");

    loaded = false;
  }
  const chatTime = loaded === true ? "mt-2" : "";

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
        <div className={`${chatTime}`}>
          {loaded
            ? addZeroBefore(createdAt?.toDate().getHours()) +
              ":" +
              addZeroBefore(createdAt?.toDate().getMinutes())
            : ""}
        </div>
      </div>
    </>
  );
}

function ChatDate(props: { dates: groupByDate }) {
  const tanggal = props.dates.date;
  var loaded = true;

  if (tanggal == "undefined/NaN/undefined") {
    // if there's undefined/nan/undefined then return loaded with false so in the html will return empty string
    console.log("hello");

    loaded = false;
  }
  const dateBubble =
    loaded === true
      ? "flex justify-center items-center my-5 w-28 h-10 bg-dateBubble rounded-lg"
      : "";

  return (
    <div className="flex justify-center sticky top-0">
      <div className={`${dateBubble}`}>{loaded ? tanggal : ""}</div>
    </div>
  );
}

function addZeroBefore(n: number) {
  return (n < 10 ? "0" : "") + n;
}

export default ChatRoom;
