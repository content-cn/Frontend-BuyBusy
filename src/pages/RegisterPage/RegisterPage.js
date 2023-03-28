import React, { useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { user, loading, error, message, signup, clearError } =
    useContext(AuthContext);

  const isAuth = user;

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }

    if (error) {
      toast.error(message);
      clearError();
    }
  }, [error, user, message]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const nameVal = nameRef.current.value;
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    if (
      emailVal === "" ||
      nameVal === "" ||
      passwordVal === "" ||
      passwordVal.length < 6
    ) {
      return toast.error("Please enter valid data!");
    }

    await signup({ name: nameVal, email: emailVal, password: passwordVal });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
          placeholder="Enter Password"
        />
        <button className={styles.loginBtn}>
          {" "}
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
