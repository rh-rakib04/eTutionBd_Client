import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
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
