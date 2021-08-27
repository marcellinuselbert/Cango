import Footer from "./components/footer";
import Login from "./components/login";
import ChatRoom from "./components/chat";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-center lg:mt-10">
      <div className="lg:w-1/3 w-full">
        <div>
          <section>{user ? <ChatRoom /> : <Login />}</section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
