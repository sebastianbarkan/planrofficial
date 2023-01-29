import React from "react";
import styles from "../Header/Header.module.css";
import HeaderLogo from "../../assets/headerLogo.svg";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
function Header({ name }) {
  let router = useRouter();
  return (
    <nav className={styles.wrapper}>
      <span className={styles.logoWrap}>
        <HeaderLogo className={styles.logo} />
        <h1 className={styles.title}>planr</h1>
      </span>
      <span className={styles.buttonWrapper}>
        <button
          type="button"
          className={
            router.pathname === "/home"
              ? `${styles.button} ${styles.selected}`
              : styles.button
          }
        >
          New Trip!
        </button>
        <button type="button" className={styles.button}>
          Past Trips
        </button>
      </span>
      <span className={styles.profileWrap}>
        <p className={styles.name}>{name}</p>
        <button onClick={signOut}>Sign Out</button>
      </span>
    </nav>
  );
}

export default Header;
