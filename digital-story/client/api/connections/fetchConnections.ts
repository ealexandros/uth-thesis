import { useQuery } from "react-query";
import { axios } from "../../lib/axios";

export type ConnectionsResponse = {
  alias: string;
  connection_id: string;
  active: boolean;
};

const fetchConnections = (): Promise<ConnectionsResponse[]> => {
  return axios.get("/connections");
};

export const useFetchConnectionsQuery = () => {
  return useQuery("connections", () => fetchConnections());
};
