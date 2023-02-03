import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetQuestionSetAnswers } from "./useGetQuestionSetAnswers";
import { useRefreshQuestionSet } from "./useRefreshQuestionSet";

interface FetchProps {
  dates: string;
  type: string;
  budget: string;
  location: string;
  userId: string;
}

interface Props {
  userId: string;
  questionSetAnswers: Object;
}

export async function fetchChatGptResponse({
  dates,
  type,
  budget,
  location,
  userId,
}: FetchProps) {
  console.log("RUN CHATGPT REQUEST");
  return await fetch("http://localhost:3000/api/chatgpt/get-chatgpt-response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dates: dates,
      type: type,
      budget: budget,
      location: location,
      userId: userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("CHATRESPONSE", data);
      return data;
    });
}

export function useGetChatGptResponse({ userId, questionSetAnswers }: Props) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const {
    isLoading,
    isFetching,
    isStale,
    isError,
    data,
    error,
    fetchStatus,
    refetch,
  } = useQuery(
    ["chatGptResponse", questionSetAnswers],
    () => fetchChatGptResponse(questionSetAnswers, userId),
    {
      enabled: !!questionSetAnswers,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
      onSuccess: () => {
        console.log("QUERY", data);
      },
    }
  );

  return {
    data: data,
    isLoading,
    isFetching,
    isStale,
    isError,
    error,
    fetchStatus,
    refetch,
  };
}
