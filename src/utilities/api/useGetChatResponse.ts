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
  console.log("CHT", dates, location);
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
  });
}

export function useGetChatGptResponse({ userId, questionSetAnswers }: Props) {
  console.log("APU", userId, questionSetAnswers);

  const queryClient = useQueryClient();

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
      onSuccess: () => {},
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
