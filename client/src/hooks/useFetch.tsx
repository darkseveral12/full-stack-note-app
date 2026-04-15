import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

const useFetch = (url: string, enabled?: boolean, key?: string[]) => {
  const { data, isLoading, isSuccess, isError, refetch, error } = useQuery({
    queryKey: key!,
    queryFn: () =>
      axios.get(url, { withCredentials: true }).then((res) => res.data),
    enabled: enabled ?? true,
    staleTime: 0,
    retry: false,
  });

  const statusCode = isAxiosError(error) ? error.response?.status : null;

  return { data, isLoading, isSuccess, isError, refetch, statusCode };
};

export default useFetch;
