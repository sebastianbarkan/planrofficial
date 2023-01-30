import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
}

export async function fetchGetQuestionSet({ userId }: Props) {
  return await fetch(
    `http://localhost:3000/api/questions/get-question-count?userId=${userId}`,
    {
      method: "GET",
    }
  ).then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });
}

export function useGetQuestionSet({ userId }: Props) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["getQuestionSet"],
    () => fetchGetQuestionSet({ userId })
  );
  return {
    data: data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
}
