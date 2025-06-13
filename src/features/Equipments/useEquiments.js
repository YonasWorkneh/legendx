import { useQuery } from "@tanstack/react-query";
import { getEquipments } from "../../services/equipmentApi";

function useEquipments() {
  const {
    data: equipments,
    isLoading: isLoadingequipments,
    error,
  } = useQuery({
    queryKey: ["equipments"],
    queryFn: getEquipments,
    retry: 3,
  });

  return { equipments, isLoadingequipments, error };
}

export { useEquipments };
