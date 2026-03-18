// /components/shared/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingBag, Users, Download, 
  Settings, LogOut, Package, Music, Layers 
} from "lucide-react";

const MENU_CONFIG = {
  ADMIN: [
    { label: "Panel Central", href: "/admin", icon: LayoutDashboard },
    { label: "Catálogo", href: "/admin/products", icon: Package },
    { label: "Ventas", href: "/admin/sales", icon: ShoppingBag },
    { label: "Clientes", href: "/admin/users", icon: Users },
  ],
  USER: [
    { label: "Mi Librería", href: "/dashboard/purchases", icon: Download },
    { label: "Explorar", href: "/products", icon: ShoppingBag },
    { label: "Configuración", href: "/dashboard/profile", icon: Settings },
  ]
};

export default function Sidebar({ role, isOpen }: { role: 'ADMIN' | 'USER', isOpen: boolean }) {
  const pathname = usePathname();
  const menuItems = MENU_CONFIG[role];

  return (
    <aside className={`${isOpen ? "w-64" : "w-20"} transition-all duration-300 border-r border-white/10 bg-black/50 backdrop-blur-md flex flex-col h-screen sticky top-0`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        {isOpen && <span className="font-bold tracking-tighter text-xl text-white">DIGITAL.CORE</span>}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`
              flex items-center gap-4 w-full p-3 rounded-xl transition-all group
              ${active ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"}
            `}>
              <item.icon size={20} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              {active && isOpen && <div className="ml-auto w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Desconectar</span>}
        </button>
      </div>
    </aside>
  );
}