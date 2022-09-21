import { MutationConfig } from "./../../lib/react-query";
import { useMutation } from "react-query";
import { axios } from "../../lib/axios";

const receiveConnection = (connectionUrl: string): Promise<void> => {
  return axios.post("/connection/invitation/receive", {
    inv_url: connectionUrl,
  });
};

export const useReceiveConnectionMutation = (
  options?: MutationConfig<typeof receiveConnection>
) => {
  return useMutation({
    ...options,
    mutationFn: receiveConnection,
  });
};
