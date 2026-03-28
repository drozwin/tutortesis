"use client";
import { useEffect, useState, useRef } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Menu, X } from "lucide-react";
import User from "./components/user";
import { ModeToggle } from "@/components/themeButton";
import Notifications from "./components/notifications";
import Link from "next/link";

export const Navbar = ({
  onSelectSection,
}: {
  onSelectSection: (section: string) => void;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Cerrar menú al clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="backdrop-blur-md h-16 bg-white/30 dark:bg-black/30 fixed top-0 w-full z-50">
      <div className="h-full">
        <div className="max-w-full h-full px-3 mx-auto flex items-center justify-between ">
          {/* Logo */}
          <div className="text-lg font-bold flex items-center gap-2">
            <Link href="/">
              <div className="py-2 flex items-center">
                <Icons.Box size={24} />
                <div className="ml-2 hidden sm:block">
                  <span className="text-red-600">TESIS</span>
                  <span>TUTOR</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}

          {/* Acciones derecha */}
          <div className="flex gap-2 items-center">
            <ModeToggle />
            <Notifications />
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};
