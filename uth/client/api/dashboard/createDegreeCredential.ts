import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

const createDegreeCredential = (connectionId: string): Promise<void> => {
  return axios.post(`/credentials/degree/${connectionId}`, null, {
    headers: {
      username: "admin",
    },
  });
};

export const useCreateDegreeCredential = (
  options?: MutationConfig<typeof createDegreeCredential>
) => {
  return useMutation({
    ...options,
    mutationFn: createDegreeCredential,
  });
};
