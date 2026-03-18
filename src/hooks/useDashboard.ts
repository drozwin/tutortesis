import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,

    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
  });
}