import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

const createDegreeCredential = (connectionId: string): Promise<void> => {
  return axios.post(`/admin/credentials/degree/${connectionId}`, null);
};

export const useCreateDegreeCredential = (
  options?: MutationConfig<typeof createDegreeCredential>
) => {
  return useMutation({
    ...options,
    mutationFn: createDegreeCredential,
  });
};
