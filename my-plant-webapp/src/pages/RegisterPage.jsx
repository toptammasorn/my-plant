import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onClick={onSubmit}>
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>j
          <input
            id="password"
            type="text"
            value={password}
            onChange={onChangePassword}
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
