import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../../services/offerApi";

export default function useOffers() {
  const {
    data: offers = [],
    isLoading: isLoadingOffers,
    error,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
    retry: 3,
  });

  return { offers, isLoadingOffers, error };
}