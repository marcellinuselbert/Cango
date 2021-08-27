import firebase from "firebase/app";
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
function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <div className="text-6xl text-center mt-20">Welcome to Cango</div>
      <div className="text-xl text-center mt-2"> Open Chat for All</div>
      <div className="flex justify-center mt-10">
        <div className="w-1/2 h-10 bg-blue-500 rounded-xl flex justify-center">
          <button
            className="p-2 text-white font-medium"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
