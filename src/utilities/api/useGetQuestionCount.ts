import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
}

export async function fetchGetQuestionCount({ userId }: Props) {
  return await fetch(
    `http://localhost:3000/api/questions/get-question-count?userId=${userId}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => data.questionCount);
}

export function useGetQuestionCount({ userId }: Props) {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["questionCount"],
    () => fetchGetQuestionCount({ userId })
  );

  return {
    data: data,
    isLoading,
    isError,
    isSuccess,
  };
}
