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
import { useGetQuestionCount } from "@/utilities/api/useGetQuestionCount";
import prisma from "../../utilities/prismaClient";
import { useUpdateQuestionSet } from "@/utilities/api/useUpdateQuestionSet";

export default function Home({ session }) {
  const [answer, setAnswer] = useState("");
  const { mutation } = useUpdateQuestionSet({
    answer: answer,
    userId: session.user.id,
  });
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

  const { data: questionCount } = useGetQuestionCount({
    userId: session.user.id,
  });

  const [icons, setIcons] = useState([
    <MapPinIcon key="map" className={styles.questionIcon} />,
    <CurrencyDollarIcon key="dollar" className={styles.questionIcon} />,
    <LightBulbIcon key="light" className={styles.questionIcon} />,
    <CalendarIcon key="calendar" className={styles.questionIcon} />,
  ]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const { data: chatGptResponse } = useGetChatGptResponse(answer);

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
          <button className={styles.nextButton}>Get my plan!</button>
        ) : (
          <button
            className={styles.nextButton}
            onClick={() =>
              mutation.mutate({ answer: answer, userId: session.user.id })
            }
          >
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

  const questionSet = await prisma.questionSet.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!questionSet) {
    await prisma.questionSet.create({
      data: {
        count: 0,
        dates: "",
        location: "",
        budget: "",
        userId: session.user.id,
        type: "",
      },
    });
  }

  return {
    props: {
      session,
    },
  };
}
