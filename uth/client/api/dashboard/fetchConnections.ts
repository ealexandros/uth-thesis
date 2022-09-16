import { useQuery } from "react-query";
import { axios } from "../../lib/axios";

export type ConnectionsResponse = {
  username: string;
  connection_id: string;
};

const fetchConnections = (): Promise<ConnectionsResponse[]> => {
  return axios.get("/connections", {
    headers: {
      username: "admin",
    },
  });
};

export const useFetchConnectionsQuery = () => {
  return useQuery("invitation", () => fetchConnections());
};
