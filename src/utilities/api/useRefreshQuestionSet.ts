import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
}

export async function fetchRefreshQuestionSet({ userId }: Props) {
  return await fetch(
    "http://localhost:3000/api/questions/refresh-question-set",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("refresh", data);
      return data;
    });
}

export function useRefreshQuestionSet({ userId }: Props) {
  const { data, refetch, isSuccess } = useQuery(
    ["getQuestionSetAnswers"],
    () => fetchRefreshQuestionSet({ userId }),
    {
      enabled: false,
    }
  );
  return {
    data: data,
    refetch,
    isSuccess,
  };
}
