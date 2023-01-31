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
      console.log("first", data.answers);
      return data.answers;
    });
}

export function useGetQuestionSetAnswers({ userId }: Props) {
  const { data } = useQuery(["getQuestionSetAnswers"], () =>
    fetchQuestionSetAnswers({ userId })
  );

  console.log("ORIG", data);

  return {
    data: data,
  };
}
