import { useState } from "react";
import GoogleIcon from "../../assets/google.svg";
import styles from "../../styles/SignIn.module.css";
import LoginIntro from "@/components/LoginIntro/loginIntro";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, "client");
    fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json() as Promise<{ message: string }>)
      .then((data) => {
        if (data.message === "success") {
          router.push("/auth/signIn");
        }
      });
  };

  return (
    <main className={styles.wrapper}>
      <LoginIntro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Sign Up.</h1>
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
          </div>
          <button className={styles.loginButton} onClick={handleSubmit}>
            Create Account
          </button>
          <span className={styles.signupWrap}>
            <p className={styles.signupPrompt}>Have an account?</p>
            <Link href="/auth/signIn" className={styles.signupLink}>
              Login
            </Link>
          </span>
        </form>

        <button
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
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
