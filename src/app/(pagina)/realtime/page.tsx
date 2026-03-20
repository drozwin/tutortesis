"use client";

import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function Realtime() {
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "8a564f741cf91c56607c",
      cluster: "us2",
      forceTLS: true,
      client: new Pusher("8a564f741cf91c56607c", {
        cluster: "us2",
      }),
    });

    echo.channel("admin")
      .listen("CompraRealizada", (e: any) => {
        console.log("Notificación:", e.mensaje);
        alert(e.mensaje);
      });

    return () => {
      echo.disconnect();
    };
  }, []);

  return null;
}