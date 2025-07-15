import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userApi";

function useCustomers() {
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getUsers,
    retry: 3,
  });

  return { customers, isLoadingCustomers, error };
}

export { useCustomers };
