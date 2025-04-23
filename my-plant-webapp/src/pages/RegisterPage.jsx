import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import LoginPage from "./LoginPage";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleRegister}>
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input
            id="firstname"
            type="firstname"
            value={firstname}
            placeholder="Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Lastname</label>
          <input
            id="lastname"
            type="lastname"
            value={lastname}
            placeholder="lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
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
