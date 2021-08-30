import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../utils/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <div className="text-6xl text-center mb-32 animate-slide-bottom">
        Welcome to Cango
      </div>
      <div className="text-xl text-center mt-2 animate-fade-in">
        {" "}
        Open Chat for All
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={signInWithGoogle}
          className="w-1/2 h-10 mt-20 bg-blue-500 rounded-xl flex justify-center animate-slide-top"
        >
          <div className="p-2 text-white font-medium ">Sign in with Google</div>
        </button>
      </div>
    </div>
  );
}
export default Login;
