import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { bodyData } from "../types/NoteInput";
import axios, { AxiosError } from "axios";

type ApiError = {
  message: string;
};

const createRequest = async (
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  data?: unknown,
) => {
  try {
    if (method === "DELETE")
      return await axios.delete(url, { withCredentials: true });
    else if (method === "PATCH")
      return await axios.patch(url, data, { withCredentials: true });
    else if (method === "POST")
      return await axios.post(url, data, { withCredentials: true });
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    throw error;
  }
};

const useRequest = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({
      url,
      data,
      method,
    }: {
      url: string;
      data?: unknown;
      method: "POST" | "PATCH" | "DELETE";
    }) => createRequest(url, method, data),

    onSuccess: (_data, { url, method }) => {
      if (method === "DELETE") {
        const id = url.split("/").pop();
        queryClient.setQueriesData<bodyData>({ queryKey: ["notes"] }, (old) =>
          old
            ? {
                ...old,
                message: old.message.filter((note) => String(note._id) !== id),
              }
            : old,
        );
      } else {
        // POST and PUT — normal refetch
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }
    },
  });

  return mutate;
};

export default useRequest;
