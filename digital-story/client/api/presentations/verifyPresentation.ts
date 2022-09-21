import { useMutation } from "react-query";
import { axios } from "../../lib/axios";
import { MutationConfig } from "../../lib/react-query";

type VerifyPresentationRequest = {
  conn_id: string;
  attrs: string[];
  issuer_id: string;
  schema_id: string;
};

const verifyPresentation = (body: VerifyPresentationRequest): Promise<void> => {
  return axios.post("/presentations/request", body);
};

export const useVerifyPresentationMutation = (
  options?: MutationConfig<typeof verifyPresentation>
) => {
  return useMutation({
    mutationFn: verifyPresentation,
    ...options,
  });
};
