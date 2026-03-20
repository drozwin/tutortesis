"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { registerSW, subscribeUser } from "@/lib/webNotifications";

export default function PushManager() {
  const { user } = useAuth(); // ✅ YA está dentro del provider

  useEffect(() => {
    if (!user) return;

    console.log("👤 Usuario logueado → activando push");

    registerSW().then(() => {
      subscribeUser();
    });
  }, [user]);

  return null; // no renderiza nada
}