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
import { getAuthToken, clearAuthTokens } from "../persist/AuthPersistence";
import { apiClient } from "../lib/fetch";

const PROTECTED_PATHS = ["/verificar-cuenta", "/account-banned", "/dashboard"];

type AuthContextType = {
  user: any | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
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
  async function refreshUser() {
    const token = await getAuthToken();
    if (!token) {
      setUser(null);
      setError("no_auth");
      setAuthChecked(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userResponse = await apiClient<any>("/me");

      setUser(userResponse);
      setError(null);
    } catch (err: any) {
      const status = err?.response?.status;
      const backendStatus = err?.response?.data?.status;

      if (status === 401) setError("no_auth");
      else if (status === 403) {
        if (backendStatus === "banned") setError("banned");
        else if (backendStatus === "unverified")
          setError("unverified"); // ← aquí
        else setError("no_auth");
      } else {
        setError("no_auth");
      }

      setUser(null);
      if (!status) clearAuthTokens();
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }

  // 🔹 Logout
  // context/AuthContext.tsx
  function logoutFront() {
    clearAuthTokens();
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
    if (!authChecked) return;

    const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

    if (error === "banned" && pathname !== "/account-banned") {
      router.replace("/account-banned");
      return;
    }

    if (error === "unverified") {
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
      !error &&
      ["/login", "/register", "/verificar-cuenta", "/account-banned"].includes(
        pathname,
      )
    ) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      router.replace(redirect || "/dashboard");
    }
  }, [user, authChecked, pathname, error]);

  if (loading || !authChecked) return <AuthLoaderPro />;

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
