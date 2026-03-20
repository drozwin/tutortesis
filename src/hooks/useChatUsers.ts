// hooks/useChatUsers.ts
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export function useChatUsers() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["chat-users", user?.id],
    queryFn: getUsers,
    enabled: !!user, // 🔥 clave
    staleTime: 1000 * 60 * 10,
  });
}