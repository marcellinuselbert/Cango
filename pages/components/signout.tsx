import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "../../utils/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="w-20 h-10 bg-blue-500 rounded-lg  mb-3 lg:mb-3 mr-5"
        style={{ zIndex: -1 }}
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}
export default SignOut;
