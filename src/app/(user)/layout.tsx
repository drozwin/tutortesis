// /app/(user)/layout.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useAdminNotifications";
import { Navbar } from "./dashboard/navbarPerfil";
import { SidebarPerfil } from "./dashboard/sidebarPerfil";
import { SectionRenderer } from "./dashboard/SectionRenderer";

type Notificacion = {
  id: number;
  mensaje: string;
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { loading, user } = useAuth();
  
  useNotifications(user);
  const ref = useRef<HTMLDivElement>(null);
  //todo para mapear

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    { id: 1, mensaje: "🛒 Juan compró un producto" },
    { id: 2, mensaje: "📚 Ana se suscribió a una clase" },
  ]);
  const unreadCount = notificaciones.length;

  const [section, setSection] = useState("home"); // default

  useEffect(() => {
    const savedSection = localStorage.getItem("sidebar-activeSection");
    if (savedSection) {
      setSection(savedSection);
    }
  }, []);

  // cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //

  //
  if (loading) {
    return null;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen">
      {/* --- SIDEBAR --- */}
      <Navbar onSelectSection={setSection} />
      <SidebarPerfil onSelectSection={setSection} />
      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {!true ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-7xl font-semibold text-red-400">404</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                Página no encontrada
              </h1>
            </div>
          </div>
        ) : (
          <div className="absolute flex justify-center items-center w-full flex-1 pt-16 px-4 md:px-16 custom-scrollbar ">
            <main className="dark:bg-zinc-900/50 w-full p-6 bg-zinc-200/50 shadow-black/75 shadow-lg  max-w-7xl h-auto rounded-2xl ">
              <SectionRenderer section={section} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
