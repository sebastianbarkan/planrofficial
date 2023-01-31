import styles from "@/styles/Home.module.css";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import { useGetCities } from "@/utilities/api/useGetCities";
import LocationDropdown from "@/components/LocationDropdown/LocationDropdown";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

export default function Home({ session }) {
  const [answer, setAnswer] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cityQuery, setCityQuery] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const { mutation } = useUpdateQuestionSet({
    answer: answer,
    userId: session.user.id,
  });

  const { refetch: cityRefetch, data: cityData } = useGetCities({
    cityQuery,
    setInputDisabled,
  });
  const { data: chatGptResponse, refetch: chatGptResponseRefetch } =
    useGetChatGptResponse({ userId: session.user.id });

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setAnswer(`${start} to ${end}`);
  };

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

  const handleCityQuery = (e) => {
    setCityQuery(e.target.value);
  };

  const handleGetPlan = () => {
    mutation.mutate({
      answer: answer,
      userId: session.user.id,
    });
    if (mutation.isSuccess && questionCount === 3) {
      console.log("here");
      chatGptResponseRefetch();
    }
  };

  useEffect(() => {
    const triggerCityFetch = setTimeout(() => {
      if (cityQuery.length > 0) {
        setInputDisabled(true);
        cityRefetch();
      }
    }, 1000);

    return () => clearTimeout(triggerCityFetch);
  }, [cityQuery]);

  return (
    <main className={styles.wrapper}>
      <Header name={session.user.username} />
      <section className={styles.main}>
        <h1 className={styles.question}>{questions[questionCount]}</h1>
        <div className={styles.inputWrap}>
          {questionCount === 3 ? (
            <RangeDatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(startDate, endDate) =>
                handleDateChange(startDate, endDate)
              }
              startDatePlaceholder="Start Date"
              endDatePlaceholder="End Date"
              className={styles.rangeDatePicker}
            />
          ) : (
            <>
              {icons[questionCount]}
              <input
                type="text"
                ref={(input) => input && input.focus()}
                autoFocus
                disabled={inputDisabled}
                className={styles.input}
                value={questionCount === 0 ? cityQuery : answer}
                onChange={questionCount === 0 ? handleCityQuery : handleAnswer}
                placeholder={placeholders[questionCount]}
              ></input>
            </>
          )}
          <div className={styles.dropdownWrap}>
            <LocationDropdown
              cityData={cityData}
              questionCount={questionCount}
              setAnswer={setAnswer}
            />
          </div>
        </div>
        {questionCount === 3 ? (
          <button className={styles.nextButton} onClick={handleGetPlan}>
            Get my plan!
          </button>
        ) : (
          <button
            className={styles.nextButton}
            onClick={() => {
              return mutation.mutate({
                answer: answer,
                userId: session.user.id,
              });
            }}
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
