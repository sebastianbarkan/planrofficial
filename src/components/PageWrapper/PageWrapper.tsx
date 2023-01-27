import {
  useEffect,
  useState,
  useRef,
  createContext,
  type CSSProperties,
  use,
} from "react";
import styles from "./PageWrapper.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { HomeQuestions } from "@/context/HomeQuestions";
import { TripDetails } from "@/context/TripDetails";

interface Props {
  children?: any;
  pageProps: AppProps["pageProps"];
}

export function PageWrapper(props: Props) {
  const [queryClient] = useState(() => new QueryClient());

  const [dates, setDates] = useState([]);

  const [days, setDays] = useState([]);

  const [location, setLocation] = useState();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setDates(
      localStorage.getItem("dates") === null
        ? []
        : JSON.parse(localStorage.getItem("dates"))
    );

    setDays(
      localStorage.getItem("days") === null
        ? []
        : JSON.parse(localStorage.getItem("days"))
    );

    setLocation(
      localStorage.getItem("location") === null
        ? []
        : JSON.parse(localStorage.getItem("location"))
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <HomeQuestions.Provider value={{ answers, setAnswers }}>
        <TripDetails.Provider
          value={{ location, setLocation, dates, setDates }}
        >
          {props.children}
        </TripDetails.Provider>
      </HomeQuestions.Provider>
    </QueryClientProvider>
  );
}
