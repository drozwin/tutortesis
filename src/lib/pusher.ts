"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance: Echo<any> | null = null;
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
// "ngrok-skip-browser-warning": "69420",
// export {};
/** Sesión vía cookie HttpOnly: no Bearer; el navegador envía la cookie al authEndpoint (mismo sitio/CORS con credentials). */
export function getEcho() {
  if (typeof window === "undefined") return null;

  if (echoInstance) {
    return echoInstance; 
  }

  window.Pusher = Pusher;

  // 👇 FORZAR COOKIES
  (Pusher.Runtime.createXHR as any) = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  echoInstance = new Echo({
    broadcaster: "pusher",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    forceTLS: true,
    autoConnect: false,

    authEndpoint: "http://localhost:8000/api/broadcasting/auth",

    auth: {
      headers: {
        Accept: "application/json",
      },
    },

    withCredentials: true,
  });

  console.log("🔄 Echo inicializado");
  return echoInstance;
}
