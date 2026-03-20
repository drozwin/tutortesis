"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance: Echo<any> | null = null;
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

export {};
export function getEcho(token: string, webId: string) {
  if (typeof window === "undefined") return null;

  // Si ya existe una instancia, la desconectamos para aplicar los nuevos headers
  if (echoInstance) {
    echoInstance.disconnect();
  }

  window.Pusher = Pusher;

  echoInstance = new Echo({
    broadcaster: "pusher",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    forceTLS: true,
    autoConnect: false, // <--- DETENEMOS LA CONEXIÓN AUTOMÁTICA
    authEndpoint:
      "https://katina-beadflush-unacquisitively.ngrok-free.dev/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-web-id": webId,
        Accept: "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    },
  });

  console.log(
    "🔄 Echo (Re)inicializado con token:",
    token.substring(0, 15) + "...",
  );
  return echoInstance;
}
