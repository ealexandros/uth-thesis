import { useQuery } from "react-query";
import { axios } from "../../lib/axios";

export type CredentialResponse = {
  attrs: {
    [key: string]: string;
  };
};

const fetchCredentials = (): Promise<CredentialResponse[]> => {
  return axios.get("/credentials");
};

export const useFetchCredentialsQuery = () => {
  return useQuery("credentials", () => fetchCredentials());
};
