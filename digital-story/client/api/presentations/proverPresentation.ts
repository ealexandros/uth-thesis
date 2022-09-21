import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

export type ProverPresentationRequest = {
  pres_ex_id: string;
  rev_attrs: string[];
};

const proverPresentation = (body: ProverPresentationRequest): Promise<void> => {
  return axios.post("/presentations", body);
};

export const useProverPresentationMutation = (
  options?: MutationConfig<typeof proverPresentation>
) => {
  return useMutation({
    mutationFn: proverPresentation,
    ...options,
  });
};
