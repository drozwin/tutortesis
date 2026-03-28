// /app/(user)/layout.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { sidebarConfig } from "./dashboard/items";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { LogOut, Bell, Search, Menu, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/themeButton";
import { useDashboard } from "@/hooks/useDashboard";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@/hooks/useAdminNotifications";

type Notificacion = {
  id: number;
  mensaje: string;
};

function hasAccess(pathname: string, permissions: string[]) {
  const route = sidebarConfig.find((item) => pathname === item.href);
  if (!route) return false;
  if (!route.permission) return true;
  return permissions.includes(route.permission);
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { loading, user, logoutFront } = useAuth();
  useNotifications(user);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  //todo para mapear
  const { data, isLoading } = useDashboard();
  const queryClient = useQueryClient();
  const permissions = data?.permissions ?? [];
  const filteredNavItems = sidebarConfig.filter((item) => {
    if (!item.permission) return true;
    return permissions.includes(item.permission);
  });
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    { id: 1, mensaje: "🛒 Juan compró un producto" },
    { id: 2, mensaje: "📚 Ana se suscribió a una clase" },
  ]);
  const unreadCount = notificaciones.length;
  const hasPermission = hasAccess(pathname, permissions);

  //

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
  async function handleLogout(e: React.FormEvent) {
    e.preventDefault();

    const confirmLogout = window.confirm("¿Deseas cerrar sesión?");
    if (!confirmLogout) return; // si cancela, no hace nada

    try {
      const response = await logout(); // ahora sí funciona
      logoutFront();
      alert(response.message ?? "Sesión cerrada correctamente");
      queryClient.clear();
      router.replace("/login");
    } catch (err: any) {
      console.error("Error al cerrar sesión:", err);
      alert(err?.data?.error || "Ocurrió un error al cerrar sesión");
    }
  }
  
  if (loading || isLoading) {
    return null;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen  flex font-sans">
      {/* --- SIDEBAR --- */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"} border-r border-black/10  backdrop-blur-md flex flex-col sticky top-0 h-screen`}
      >
        <div className="w-full mt-4 flex items-center gap-3 rounded-full rounded-tl-full  bg-linear-to-t">
          <Link href={"/"} className="mx-auto">
            <div
              className={`${isSidebarOpen ? "w-20 h-20" : "w-10 h-10"} mx-auto p-0.5 bg-amber-50 bg-linear-to-br rounded-full shrink-0`}
            >
              <img src="/logo.png" alt="" />
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-2 space-y-2 mt-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 w-full p-3 rounded-full transition-all group ${
                  pathname === item.href
                    ? "shadow-inner shadow-black bg-black/5 text-red-600 "
                    : "text-gray-500 dark:text-gray-200 hover:bg-black/20 dark:hover:bg-black/40"
                }`}
              >
                <Icon size={22} />

                {isSidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-3 rounded-full  hover:text-red-600 hover:bg-black/40 transition-all font-medium text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Desconectar</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-black/10 flex items-center justify-between px-8  backdrop-blur-xl z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xs font-mono text-red-600/70 tracking-[0.2em] uppercase hidden sm:block">
              Sistema de control
            </h2>
          </div>

          <div className="relative" ref={ref}>
            {/* BOTÓN */}
            <button
              onClick={() => setOpen(!open)}
              className="relative text-gray-400 hover:text-white transition-colors"
            >
              <Bell size={20} />

              {/* 🔥 contador */}
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-[#0f172a] border border-white/10 rounded-xl shadow-xl z-50">
                {/* HEADER */}
                <div className="p-3 border-b border-white/10 font-semibold text-sm">
                  Notificaciones
                </div>

                {/* LISTA */}
                <div className="max-h-80 overflow-y-auto">
                  {notificaciones.length === 0 ? (
                    <div className="p-4 text-sm text-gray-400 text-center">
                      No hay notificaciones
                    </div>
                  ) : (
                    notificaciones.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 text-sm hover:bg-white/5 cursor-pointer transition"
                      >
                        {n.mensaje}
                      </div>
                    ))
                  )}
                </div>

                {/* FOOTER */}
                <div className="p-2 border-t border-white/10 text-center text-xs text-gray-400">
                  Ver todas
                </div>
              </div>
            )}
          </div>
        </header>
        {!hasPermission ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-7xl font-semibold text-indigo-400">404</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Página no encontrada
              </h1>
            </div>
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {children}
          </main>
        )}
      </div>
    </div>
  );
}
