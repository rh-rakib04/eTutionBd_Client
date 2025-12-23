import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosInstance from "../hooks/useAxiosInstance";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  const { isLoading: roleLoading, data: role = [] } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const re = await axiosSecure.get(`/users/${user?.email}/role`);
      return re.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
