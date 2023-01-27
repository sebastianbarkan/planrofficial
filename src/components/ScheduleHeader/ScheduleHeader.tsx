import React from "react";
import styles from "../ScheduleHeader/ScheduleHeader.module.css";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function ScheduleHeader() {
  return (
    <section className={styles.wrapper}>
      <Link to="/home" className={styles.button}>
        go back
      </Link>
      <h1 className={styles.title}>Chicago Trip!</h1>
      <div className={styles.calendarWrap}>
        <span className={styles.calendarItem}>
          <CalendarIcon className={styles.icon} />
          <p className={styles.date}>1/14 - 1/30</p>
        </span>
      </div>
    </section>
  );
}

export default ScheduleHeader;
