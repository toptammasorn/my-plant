import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import "../index.css";

import LoginPage from "./LoginPage";
import SignInWithGoogle from "../components/signInWithGoogle.jsx";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  let navigate = useNavigate();

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
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('src/assets/backgrounds/lotr.jpg')" }}
      >
        <ToastContainer />
        <form
          onSubmit={handleRegister}
          className=" bg-white/60 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <h1 className="text-4xl font-bold text-center">Sign Up</h1>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 custom-grid">
            <div>
              <label htmlFor="firstname">Firstname</label>
              <input
                id="firstname"
                type="firstname"
                value={firstname}
                placeholder="Firstname"
                required
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 hover:border-gray-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="lastname">Lastname</label>
              <input
                id="lastname"
                type="lastname"
                value={lastname}
                placeholder="lastname"
                required
                onChange={(e) => setLastname(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 hover:border-gray-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 hover:border-gray-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="text"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-green-500 hover:border-gray-500 transition duration-300"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 p-2 w-full rounded-md shadow-sm  transition duration-300"
            >
              Sign up
            </button>
          </div>
          <div className="text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:text-blue-700">
                Log in
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <SignInWithGoogle />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
