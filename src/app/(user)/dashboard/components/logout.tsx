"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logoutFront } = useAuth();

  const handleLogout = async () => {
    const toastId = toast.loading("Cerrando sesión...");

    try {
      const response = await logout();

      logoutFront();
      queryClient.clear();

      toast.success(response?.message || "Sesión cerrada correctamente", {
        id: toastId,
      });

      router.replace("/login");
    } catch (err: any) {
      console.error("❌ LOGOUT ERROR:", err);

      const message =
        err?.data?.message || err?.message || "Error al cerrar sesión";

      toast.error(message, { id: toastId });
    }
  };

  return { handleLogout };
}
