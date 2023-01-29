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

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      {props.children}
    </QueryClientProvider>
  );
}
