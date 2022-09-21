import { useQuery } from "react-query";
import { axios } from "../../lib/axios";

export type PresentationResponse = {
  state: string;
  role: string;
  label: string;
  presentation_exchange_id: string;
  revealed_attrs?:
    | {
        [key: string]: string;
      }
    | {};
  requested_attrs?: string[];
};

type TRole = "prover" | "verifier";

const fetchPresentation = (role?: TRole): Promise<PresentationResponse[]> => {
  return axios.get("/presentations", {
    params: {
      ...(role && { role: role }),
    },
  });
};

export const useFetchPresentationQuery = (role?: TRole) => {
  return useQuery("presentations", () => fetchPresentation(role));
};
