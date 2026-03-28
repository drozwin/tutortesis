"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  read?: boolean;
};

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Simulación de notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "🛒 Nueva compra realizada" },
    { id: 2, message: "📚 Nuevo curso disponible" },
    { id: 3, message: "🔥 Oferta activa hoy" },
  ]);

  const unreadCount = notifications.length;

  // 🔹 Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Marcar como leídas (opcional)
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="flex items-center relative" ref={dropdownRef}>
      {/* 🔔 BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 transition"
      >
        <Bell className="w-5 h-5" />

        {/* 🔴 BADGE */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📥 DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-12 w-72 backdrop-blur-3xl bg-white/30 dark:bg-black/30 border  rounded-xl shadow-xl">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b ">
            <span className="font-semibold">Notificaciones</span>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-xs text-red-400 hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* LISTA */}
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-center text-zinc-400">
                No hay notificaciones
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-2 text-sm hover:bg-zinc-700/30 transition cursor-pointer"
                >
                  {n.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
