import { useQuery } from "@tanstack/react-query";
import { useGetQuestionSetAnswers } from "./useGetQuestionSetAnswers";

interface FetchProps {
  dates: string;
  type: string;
  budget: string;
  location: string;
}

interface Props {
  userId: string;
}

export async function fetchChatGptResponse({
  dates,
  type,
  budget,
  location,
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
    }),
  });
}

export function useGetChatGptResponse({ userId }: Props) {
  const { data: questionSetAnswers } = useGetQuestionSetAnswers({ userId });
  console.log("GUESS", questionSetAnswers);
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
    ["chatGptResponse"],
    () => fetchChatGptResponse(questionSetAnswers),
    {
      enabled: false,
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
