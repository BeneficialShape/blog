import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useUserAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { signUp } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    // console.log("Email:", email, "Password:", password);
    // Reset form fields

    try {
      await signUp(email, password);
      navigate("/login");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className={styles.signInContainer}>
        <h2>Sign Up</h2>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className={styles.signInContainer}>
        <p>
          Already have an accout? <Link to="/login">Sign In</Link>{" "}
        </p>
      </div>
    </>
  );
};

export default SignUp;
