import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

const loginWithUsername = (username: string): Promise<void> => {
  return axios.post("/login", {
    username,
  });
};

export const useLoginMutation = (
  options?: MutationConfig<typeof loginWithUsername>
) => {
  return useMutation({
    ...options,
    mutationFn: loginWithUsername,
  });
};
