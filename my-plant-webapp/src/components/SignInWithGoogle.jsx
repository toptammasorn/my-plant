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
    <>
      <div>
        <h3>Or</h3>
      </div>
      <div>
        <button type="button" onClick={googleLogin}>
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default SignInWithGoogle;
