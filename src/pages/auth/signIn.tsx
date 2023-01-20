import { useState } from "react";
import GoogleIcon from "../../assets/google.svg";
import styles from "../../styles/SignIn.module.css";
import LoginIntro from "@/components/LoginIntro/loginIntro";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import AccessDenied from "@/components/accessDenied";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <main className={styles.wrapper}>
      <LoginIntro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Login.</h1>
        <form className={styles.form}>
          <div className={styles.inputWrap}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              className={styles.input}
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              className={styles.input}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p className={styles.forgotPassword}>Forgot password?</p>
          </div>
          <button className={styles.loginButton} onClick={handleSubmit}>
            Login
          </button>
          <span className={styles.signupWrap}>
            <p className={styles.signupPrompt}>Don&apos;t have an account?</p>
            <Link href="/auth/register" className={styles.signupLink}>
              Sign up.
            </Link>
          </span>
        </form>

        <button
          onClick={(e) => {
            e.preventDefault();
            signIn("google", { callbackUrl: "/" });
          }}
          className={styles.googleButton}
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
