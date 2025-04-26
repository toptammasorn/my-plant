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
    <div className="text-center w-70">
      <div className="flex items-center justify-center gap-2 mb-6 text-gray-400">
        <hr className="w-full border-gray-400" />
        <span>OR</span>
        <hr className="w-full border-gray-400" />
      </div>
      <div>
        <button
          type="button"
          onClick={googleLogin}
          class="form-submitServiceButton"
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
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInWithGoogle;
