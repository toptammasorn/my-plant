import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import SignInWithGoogle from "../components/signInWithGoogle.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNotMiLA, setIsNotMiLA] = useState(false);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsNotMiLA(true);
    console.log(email);
    console.log(password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("User Logged in Successfully!!");
      toast.success("User Logged in Successfully!!", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('../src/assets/backgrounds/Terrarium-3.png')",
      }}
    >
      <ToastContainer />
      <form
        onSubmit={handleLogin}
        className="grid bg-white/80 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Header */}
        <div>
          <div className="form-header-prefix text-green-600">Welcome back</div>
          <div className="form-header text-green-700">
            Miniature Landscape Artist
          </div>
        </div>

        {isNotMiLA && (
          <div className="text-center text-red-800 mt-6 mb-2">
            <p>You're not Miniature Landscape Artist!</p>
            <p>Please sign up</p>
          </div>
        )}

        {/* Sign in with Email */}
        <div>
          {/* Inputs */}
          <div className="grid gap-2 custom-grid mb-6">
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password">Password</label>j
              <input
                id="password"
                type="text"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Sign in button */}
          <div className="mb-6">
            <button type="submit" class="form-submitButton">
              Log in
            </button>
          </div>
        </div>

        {/* If don't have an account yet, press button to redirect to Register page */}
        <div className="text-center text-gray-600 mb-6 text-shadow-sm flex flex-wrap justify-center">
          <p className="mr-2">Want to be a Miniature Landscape Artist?</p>
          <Link to={"/register"} className="text-blue-600 hover:text-blue-700">
            Sign up
          </Link>
        </div>

        {/*Sign in with Google */}
        <div className="flex justify-center">
          <SignInWithGoogle />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
