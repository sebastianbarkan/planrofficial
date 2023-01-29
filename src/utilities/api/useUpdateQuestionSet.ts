import { useMutation } from "@tanstack/react-query";

interface Props {
  answer: string;
  userId: string;
}
export async function fetchUpdateQuestionSet({ answer, userId }: Props) {
  return await fetch(
    `http://localhost:3000/api/questions/update-question-set`,
    {
      method: "POST",
      body: JSON.stringify({
        answer: answer,
        userId: userId,
      }),
    }
  ).then((res) => res.status);
}

export function useUpdateQuestionSet({ answer, userId }: Props) {
  const mutation = useMutation({
    mutationFn: ({ answer, userId }: Props) =>
      fetchUpdateQuestionSet({ answer, userId }),
  });

  return {
    mutation,
  };
}
