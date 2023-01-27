import { useQuery } from "@tanstack/react-query";

interface Props {
  date: string;
  type: string;
  budget: string;
  location: string;
}

export async function fetchChatGptResponse(props: Props) {
  return await fetch(
    "http://localhost:3000/api/chatgpt/get-chat-gpt-response",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: props.date,
        type: props.type,
        budget: props.budget,
        location: props.location,
      }),
    }
  );
}

export function useGetChatGptResponse(props: Props) {
  const {
    isLoading,
    isFetching,
    isStale,
    isError,
    data,
    error,
    fetchStatus,
    refetch,
  } = useQuery(["chatGptResponse"], () => fetchChatGptResponse(props));

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
