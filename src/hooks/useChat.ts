"use client";

import { useEffect, useState } from "react";
import { useChatUsers } from "./useChatUsers";
import { getEcho } from "@/lib/pusher";
import { getAuthToken } from "@/persist/AuthPersistence";
import { getPersistentId } from "@/persist/persistentId";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/fetch";

export function useChat() {
  const { user } = useAuth();
  const { data: users = [] } = useChatUsers();

  const [messages, setMessages] = useState<any[]>([]);

  // 🔹 realtime
  useEffect(() => {
    if (!user?.id) return;

    const init = async () => {
      const token = await getAuthToken();
      const webId = await getPersistentId();

      const echo = getEcho(token, webId);

      echo
        ?.private(`user.chat.${user.id}`)
        .listen(".message.sent", (data: any) => {
          console.log("📩 DATA COMPLETA:", data);

          const msg = data.message;

          console.log("✉️ Nuevo mensaje de:", msg.sender_id);
          console.log("💬 Mensaje:", msg.content);

          setMessages((prev) => [...prev, msg]);
        });
    };

    init();
  }, [user?.id]);

  // 🔥 AQUÍ ESTÁ LA CLAVE
  const sendMessage = async (receiver_id: number, content: string) => {
    if (!user) return;

    const res = await apiClient("/sendmessage", {
      method: "POST",
      body: JSON.stringify({
        receiver_id,
        content,
      }),
    });

    // 💡 optimista (se ve instantáneo)
    setMessages((prev) => [
      ...prev,
      {
        sender_id: user.id,
        receiver_id,
        content,
        timestamp: Date.now(),
      },
    ]);

    return res;
  };

  return {
    user,
    users,
    messages,
    sendMessage, // ✅ IMPORTANTE
  };
}
