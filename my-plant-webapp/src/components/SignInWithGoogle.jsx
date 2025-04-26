import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config.js";

const SignInWithGoogle = () => {
  let navigate = useNavigate();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User Logged in with Google Successfully!!", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
    });
  };

  return (
    <div className="text-center w-60 space-y-6">
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <hr className="w-full border-gray-300" />
        <span>OR</span>
        <hr className="w-full border-gray-300" />
      </div>
      <div>
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex item-center justify-center gap-2 text-white font-semibold py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-300"
        >
          <img
            src="src\assets\icons\google-symbol.png"
            alt="Google"
            className="w-6 h-6"
          />
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <hr className="w-full border-gray-300" />
            <span>|</span>
            <hr className="w-full border-gray-300" />
          </div>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignInWithGoogle;
