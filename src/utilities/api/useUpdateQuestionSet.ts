import { useMutation } from "@tanstack/react-query";
import getQuestionCount from "@/pages/api/questions/get-question-count";
import { useGetQuestionCount } from "./useGetQuestionCount";
interface Props {
  answer: string;
  userId: string;
}
export async function fetchUpdateQuestionSet({ answer, userId }: Props) {
  return await fetch(
    `http://localhost:3000/api/questions/update-question-set`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer,
        userId: userId,
      }),
    }
  ).then((res) => {
    return res.status;
  });
}

export function useUpdateQuestionSet({ answer, userId }: Props) {
  const { refetch } = useGetQuestionCount({ userId });
  const mutation = useMutation({
    mutationFn: ({ answer, userId }: Props) =>
      fetchUpdateQuestionSet({ answer, userId }),
    onSuccess: () => refetch(),
  });

  return {
    mutation,
  };
}
