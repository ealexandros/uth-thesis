import { MutationConfig } from "./../../lib/react-query";
import { useMutation } from "react-query";
import { axios } from "../../lib/axios";

type TCreateConnection = {
  inv_url: string;
};

const createConnection = (): Promise<TCreateConnection> => {
  return axios.post("/connections/invitation");
};

export const useCreateConnectionMutation = (
  options?: MutationConfig<typeof createConnection>
) => {
  return useMutation({
    ...options,
    mutationFn: createConnection,
  });
};
