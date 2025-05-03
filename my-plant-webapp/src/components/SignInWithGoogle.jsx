import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config.js";
import Spinner from "./spinners/PacmanSpinner.jsx";

const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User Logged in with Google Successfully!!", {
          position: "top-center",
        });
        setLoading(true);
        await delay();
        setLoading(false);
        navigate("/dashboard");
      }
    });
  };

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <div className="flex justify-center">
      <div className="text-center w-70">
        <div className="flex items-center justify-center gap-2 mb-6 text-gray-400">
          <hr className="w-full border-gray-400" />
          <span>OR</span>
          <hr className="w-full border-gray-400" />
        </div>

        <button
          type="button"
          onClick={googleLogin}
          class="form-submitServiceButton"
        >
          {loading ? (
            <Spinner pacColor={"#dbdfff"} />
          ) : (
            <div className="flex gap-2">
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
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignInWithGoogle;
