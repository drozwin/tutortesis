import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboardService";
import { useAuth } from "@/context/AuthContext";

export function useDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["dashboard", user?.id], 
    queryFn: getDashboard,
    enabled: !!user, // solo si hay usuario

    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
  });
}
