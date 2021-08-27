import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="w-20 h-10 bg-blue-500 rounded-lg mb-2 mr-2"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}
export default SignOut;
