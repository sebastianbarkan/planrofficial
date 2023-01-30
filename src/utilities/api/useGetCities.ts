import { useQuery } from "@tanstack/react-query";

interface Props {
  cityQuery: string;
  setInputDisabled: Function;
}

interface FetchProps {
  cityQuery: string;
}

export async function fetchGetCities({ cityQuery }: FetchProps) {
  return await fetch(`http://localhost:3000/api/utilities/get-cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cityQuery: cityQuery,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export function useGetCities({ cityQuery, setInputDisabled }: Props) {
  const { data, refetch, isLoading, isSuccess } = useQuery(
    ["getCities"],
    () => fetchGetCities({ cityQuery }),
    {
      enabled: false,

      onSuccess: () => {
        setInputDisabled(false);
      },
    }
  );

  return {
    data: data,
    isLoading,
    isSuccess,
    refetch,
  };
}
