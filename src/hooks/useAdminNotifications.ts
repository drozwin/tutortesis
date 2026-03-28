"use client";

import { useEffect, useState, useRef } from "react";
import { getEcho } from "@/lib/pusher";

import { playAudio, initAudio } from "@/lib/audio";

export function useNotifications(user: any, activeChatUserId?: number | null) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [echoInstance, setEchoInstance] = useState<any>(null);

  useEffect(() => {
    initAudio();
    if (!user?.id || !user?.role_from_token) return;

    const startRealtime = async () => {
      const echo = getEcho();
      if (!echo) return;

      console.log("🔌 Conectando WebSockets...");
      echo.connect();
      setEchoInstance(echo); // Guardamos la instancia para otros efectos

      // 1. Canal de Notificaciones Personales
      const personalChannel = `${user.role_from_token}.notifications.${user.id}`;
      echo
        .private(personalChannel)
        .listen(".new-notification", (data: any) => {
          console.log("🔔 Alerta personal:", data.message);
          playAudio();
        });

      // 2. Canal de Notificaciones Grupales (Rol)
      const groupChannel = `role-group.${user.role_from_token}`;

      echo
        .private(groupChannel)
        .listen(".group-announcement", (data: any) => {
          const payload = data.data;

          let message = "";

          if (payload.type === "purchase") {
            message = `🛒 ${payload.data.user} compró ${payload.data.product}`;
          } else if (payload.type === "register") {
            message = `👤 Nuevo usuario registrado: ${payload.data.user}`;
          }
          playAudio();
        });

      // 3. Canal de CHAT PRIVADO 1-a-1
      echo
        .private(`user.chat.${user.id}`)
        .listen(".message.sent", (e: any) => {
          console.log("✉️ Nuevo mensaje de:", e.message.sender_name);

          // Lógica del contador: si no tengo el chat abierto con quien me envía
          if (activeChatUserId !== e.message.sender_id) {
            setUnreadCount((prev) => prev + 1);
            playAudio();
          }
        });
    };

    startRealtime();

    return () => {
      if (echoInstance) {
        echoInstance.disconnect();
      }
    };
  }, [user?.id, activeChatUserId]); // Se reinicia si cambia el usuario o el chat activo

  return { unreadCount, setUnreadCount };
}
