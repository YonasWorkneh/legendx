import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsApi";

function useSettings() {
  const {
    data: settings = [],
    isLoading: isLoadingSettings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    retry: 3,
  });

  return { settings, isLoadingSettings, error };
}

export { useSettings };
