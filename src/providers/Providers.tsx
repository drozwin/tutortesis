"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/persistGlobalQueryClient";
import { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";

import { initPushSoundListener } from "@/lib/pushListener";
import PushManager from "./PushManager";
import { AuthProvider } from "@/context/AuthContext";
import { initAudio } from "@/lib/audio";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 🔹 ID persistente
  
  useEffect(() => {
    initPushSoundListener();
  }, []);
  // 🔹 Audio
  useEffect(() => {
    initAudio();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {" "}
          <PushManager />
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
