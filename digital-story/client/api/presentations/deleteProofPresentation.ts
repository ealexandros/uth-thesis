import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

const deleteProofPresentation = (presExId: string): Promise<void> => {
  return axios.delete(`/presentations/${presExId}`);
};

export const useDeleteProofPresentation = (
  options?: MutationConfig<typeof deleteProofPresentation>
) => {
  return useMutation({
    mutationFn: deleteProofPresentation,
    ...options,
  });
};
