import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../store/auth-context";

const LogIn = () => {
  const navigate = useNavigate();
  if (window.localStorage.getItem("isLoggedIn") === true) {
    navigate("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { signIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className={styles.signInContainer}>
        <h2>Sign In</h2>
        {error && <alert className={styles.alert}>{error}</alert>}
        <form onSubmit={handleSubmit} className={styles.signInForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
          <button type="submit">Sign In With Google</button>
        </form>
      </div>
      <div className={styles.signInContainer}>
        <p>
          Don't have an accout? <Link to="signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
};

export default LogIn;
