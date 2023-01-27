import styles from "@/styles/Home.module.css";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import React, { useContext, useState, useEffect } from "react";
import {
  MapPinIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { HomeQuestions } from "../context/HomeQuestions";
import { TripDetails } from "../context/TripDetails";
import { useGetChatGptResponse } from "@/utilities/api/useGetChatResponse";

export default function Home({ session }) {
  const [questionCount, setQuestionCount] = useState(0);
  const { answers, setAnswers } = useContext(HomeQuestions);
  const { setLocation, setDates, setDays } = useContext(TripDetails);
  const [answer, setAnswer] = useState("");
  const [placeholders, setPlaceholders] = useState([
    "New York City, New York",
    "$300",
    "Family getaway",
    "1/14/23 to 1/20/23",
  ]);

  const [questions, setQuestions] = useState([
    [`Hey ${session.user.username}, Where are you going?`],
    ["What's your budget?"],
    ["What kind of trip is this?"],
    ["When are you going?"],
  ]);

  const [icons, setIcons] = useState([
    <MapPinIcon key="map" className={styles.locationIcon} />,
    <CurrencyDollarIcon key="dollar" className={styles.locationIcon} />,
    <LightBulbIcon key="light" className={styles.locationIcon} />,
    <CalendarIcon key="calendar" className={styles.locationIcon} />,
  ]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleNext = () => {
    setAnswers([...answers, answer]);
    setAnswer("");
    setQuestionCount(questionCount + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswers([...answers, answer]);
    setAnswer("");
    setQuestionCount(0);
  };

  const { data: chatGptResponse } = useGetChatGptResponse(answers);

  return (
    <main className={styles.wrapper}>
      <Header name={session.user.username} />
      <section className={styles.main}>
        <h1 className={styles.question}>{questions[questionCount]}</h1>
        <div className={styles.inputWrap}>
          {icons[questionCount]}
          <input
            type="text"
            className={styles.input}
            value={answer}
            onChange={handleAnswer}
            placeholder={placeholders[questionCount]}
          ></input>
        </div>
        {questionCount === 3 ? (
          <button className={styles.nextButton} onClick={handleSubmit}>
            Get my plan!
          </button>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
