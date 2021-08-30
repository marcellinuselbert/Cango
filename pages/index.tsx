import Footer from "./components/footer";
import Login from "./components/login";
import ChatRoom from "./components/chat";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseConfig from "../utils/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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
