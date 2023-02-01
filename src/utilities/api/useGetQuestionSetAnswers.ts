import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
}

export async function fetchQuestionSetAnswers({ userId }: Props) {
  return await fetch(
    `http://localhost:3000/api/questions/get-question-set-answers?userId=${userId}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.answers;
    });
}

export function useGetQuestionSetAnswers({ userId }: Props) {
  const { data, refetch, isSuccess } = useQuery(
    ["getQuestionSetAnswers"],
    () => fetchQuestionSetAnswers({ userId }),
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
