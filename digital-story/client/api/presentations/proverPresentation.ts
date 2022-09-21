import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

const proverPresentation = (presExId: string): Promise<void> => {
  return axios.post(`/presentations/${presExId}`);
};

export const useProverPresentationMutation = (
  options?: MutationConfig<typeof proverPresentation>
) => {
  return useMutation({
    mutationFn: proverPresentation,
    ...options,
  });
};
