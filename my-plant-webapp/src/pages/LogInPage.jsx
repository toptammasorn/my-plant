import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import SignInWithGoogle from "../components/signInWithGoogle.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <h1>Log In</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>j
          <input
            id="password"
            type="text"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
        <div>
          <p>
            Don't have account yet? <Link to={"/register"}>Sign up</Link>
          </p>
        </div>
        <SignInWithGoogle />
      </form>
    </>
  );
};

export default LoginPage;
