import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboardService";
import { useAuth } from "@/context/AuthContext";

export function useDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: getDashboard,
    enabled: !!user,
  
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
}
