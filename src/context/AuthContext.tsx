"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useRouter, usePathname } from "next/navigation";

import { AuthLoaderPro } from "../components/Loader";
import { apiClient } from "../lib/fetch";

const PROTECTED_PATHS = ["/verificar-cuenta", "/account-banned", "/dashboard"];

export type RefreshUserResult = {
  user: any | null;
  error: string | null;
};

type AuthContextType = {
  user: any | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<RefreshUserResult>;
  logoutFront: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // 🔹 Función principal de refresco de usuario
  async function refreshUser(): Promise<RefreshUserResult> {
    setLoading(true);

    let nextUser: any | null = null;
    let nextError: string | null = null;

    try {
      console.log("📡 Llamando /me...");
      const userResponse = await apiClient<any>("/me");

      console.log("✅ Usuario recibido:", userResponse);

      nextUser = userResponse;
      setUser(userResponse);
      setError(null);
    } catch (err: any) {
      console.log("🔐 Auth error:", err);

      const status = err?.status;
      const backendStatus = err?.data?.status;

      if (status === 401) nextError = "no_auth";
      else if (status === 403) {
        if (backendStatus === "banned") nextError = "banned";
        else if (backendStatus === "unverified") nextError = "unverified";
        else nextError = "no_auth";
      } else {
        nextError = "no_auth";
      }

      setError(nextError);
      nextUser = null;
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }

    return { user: nextUser, error: nextError };
  }

  // 🔹 Logout
  // context/AuthContext.tsx
  function logoutFront() {
    setUser(null);
    setError(null);
  }

  // 🔹 Hook inicial
  useEffect(() => {
    console.log("📌 useEffect init refreshUser");
    refreshUser();
  }, []);

  // 🔹 Manejo de rutas protegidas y redirecciones
  useEffect(() => {
    if (!authChecked || loading) return;

    const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

    if (error === "banned" && pathname !== "/account-banned") {
      router.replace("/account-banned");
      return;
    }

    if (error === "unverified" && pathname !== "/verificar-cuenta") {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      router.replace(`/verificar-cuenta?redirect=${redirect || "/dashboard"}`);
    }

    if (error === "no_auth" && isProtected) {
      router.replace("/login");
      return;
    }

    // Si usuario válido y está en rutas que no debería (login, register, verificar-cuenta), redirigir a dashboard
    if (
      user &&
      !error && //
      ["/login", "/register", "/verificar-cuenta", "/account-banned"].includes(
        pathname,
      )
    ) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      router.replace(redirect || "/dashboard");
    }
  }, [user, authChecked, pathname, error, loading]);

  // Solo bloquear la app hasta el primer /me; refrescos posteriores no desmontan las pantallas.
  if (!authChecked) return <AuthLoaderPro />;

  return (
    <AuthContext.Provider
      value={{ user, loading, error, refreshUser, logoutFront }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be usado dentro de AuthProvider");
  return ctx;
};
