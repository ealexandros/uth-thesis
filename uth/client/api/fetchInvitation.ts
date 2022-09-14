import { useQuery } from "react-query";
import { useAuth } from "../contexts/authentication";
import { axios } from "../lib/axios";

type ConnectionResponse = {
  invitationUrl: string;
};

const fetchConnection = (username?: string): Promise<ConnectionResponse> => {
  return axios.post("/connections/invitation", null, {
    headers: {
      username: username || "",
    },
  });
};

export const useFetchConnectionQuery = () => {
  const { user } = useAuth();
  return useQuery("invitation", () => fetchConnection(user?.username));
};
