import React from "react";
import styles from "../LoginIntro/LoginIntro.module.css";
import Logo from "../../assets/logo.svg";

function LoginIntro() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.logoWrap}>
        <h1 className={styles.title}>planr</h1>
        <Logo className={styles.logo} />
      </span>
      <p className={styles.slogan}>A perfect trip needs a perfect plan.</p>
    </div>
  );
}

export default LoginIntro;
