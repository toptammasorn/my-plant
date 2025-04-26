import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import SignInWithGoogle from "../components/signInWithGoogle.jsx";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [isMiLA, setisMiLA] = useState(false);

  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setisMiLA(true);
    console.log(email);
    console.log(password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstname: firstname,
          lastname: lastname,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "top-right",
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
        onSubmit={handleRegister}
        className="grid bg-white/80 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Header */}
        <div>
          <div className="form-header-prefix text-green-600">Become a</div>
          <div className="form-header text-green-700">
            Miniature Landscape Artist
          </div>
        </div>

        {isMiLA && (
          <div className="text-center text-red-800 mt-6 mb-2">
            <p>You are Miniature Landscape Artist!</p>
            <p>Please sign in</p>
          </div>
        )}

        {/* Sign up with Email */}
        <div>
          {/* Inputs */}
          <div className="grid gap-2 custom-grid mb-6">
            {/* Firstname */}
            <div>
              <label htmlFor="firstname">Firstname</label>
              <input
                id="firstname"
                type="firstname"
                value={firstname}
                placeholder="Firstname"
                required
                onChange={(e) => setFirstname(e.target.value)}
                className="form-input"
              />
            </div>
            {/* Lastname */}
            <div>
              <label htmlFor="lastname">Lastname</label>
              <input
                id="lastname"
                type="lastname"
                value={lastname}
                placeholder="Lastname"
                required
                onChange={(e) => setLastname(e.target.value)}
                className="form-input"
              />
            </div>
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
              <label htmlFor="password">Password</label>
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

          {/* Sign up button */}
          <div className="mb-6">
            <button type="submit" class="form-submitButton">
              Sign up
            </button>
          </div>
        </div>

        {/* If already have an account, press button to redirect to Login page */}
        <div className="text-center text-gray-600 mb-6 text-shadow-sm">
          <p>
            You're a Miniature Landscape Artist?{" "}
            <Link to={"/login"} className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>

        {/*Sign in with Google */}
        <div className="flex justify-center">
          <SignInWithGoogle />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
