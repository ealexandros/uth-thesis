import { useQuery } from "react-query";
import { axios } from "../../lib/axios";

export type ConnectionsResponse = {
  username: string;
  connection_id: string;
  active: boolean;
};

const fetchConnections = (): Promise<ConnectionsResponse[]> => {
  return axios.get("/admin/connections");
};

export const useFetchConnectionsQuery = () => {
  return useQuery("invitation", () => fetchConnections());
};
