import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

import LoginPage from "./LoginPage";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User registered successfully:", user);
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Email"
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
        <div>
          <p>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </p>
        </div>
        <div>
          <h3>Or</h3>
        </div>
        <div>
          <button>Sign in with Google</button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
