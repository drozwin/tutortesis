"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/persistGlobalQueryClient"
import { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { getPersistentId } from "@/persist/persistentId";
/* import PersistTokenAuth from './PersistTokenAuth' */
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = getPersistentId();
    console.log("web_id:", id);
  }, []);
  return (
    <ThemeProvider
      attribute="class" // aplica clase "dark" al <html>
      enableSystem // habilita detectar el tema del sistema
      storageKey="theme"
      disableTransitionOnChange
    >
      {/* <PersistTokenAuth /> */}
      {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}> */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider> */}
    </ThemeProvider>
  );
}
