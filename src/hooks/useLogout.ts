import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/fetch";

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    await apiClient("/logout", {
      method: "POST",
    });

    queryClient.clear(); 
  };
}