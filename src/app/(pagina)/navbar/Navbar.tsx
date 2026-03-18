"use client";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { menuData, type MenuItem } from "./menuItems";
import { ModeToggle } from "@/components/themeButton";
import CartMenu from "./CartMenu";

export const Navbar = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMenuItems(menuData);
  }, []);

  const renderIcon = (iconName?: string) => {
    const IconComponent = iconName
      ? (Icons[iconName as keyof typeof Icons] as LucideIcon)
      : null;

    return IconComponent ? <IconComponent className="w-6 h-6 " /> : null;
  };

  return (
    <div className="w-full fixed top-5 left-0  z-50 ">
      <motion.nav
        className=" max-w-7xl bg-slate-200/45 dark:bg-black/30 mx-auto  w-full backdrop-blur-md px-1 rounded-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 70 }}
      >
        {/* bloque 1 */}
        <div className="mx-auto flex items-center justify-between">
          <div className="text-lg font-bold flex items-center gap-2">
            <Link href={"/"} className="flex items-center gap-2">
              <div className="p-1">
                <img
                  src={"/logo.png"}
                  alt="TutorTesis Logo"
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="">
            <div className="max-w-7xl mx-auto">
              <nav className="hidden md:flex gap-6 justify-center items-center">
                {menuItems.map((item, i) => (
                  <div key={i} className=" ">
                    <a
                      href={item.href}
                      className="hover:bg-black/50 hover:animate-pulse rounded border-b border-b-red-700 flex bg-linear-to-t from-white/75 dark:from-black/20 to-transparent flex-col items-center px-3 py-1 hover:text-red-600"
                    >
                      {renderIcon(item.icon)}
                      <span className="text-sm ">{item.label}</span>
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex gap-2 pr-6 items-center justify-center">
            <ModeToggle />
            {/* <MenuPerfil /> */}
            <div className="flex justify-center items-center">
              <CartMenu />
            </div>
            <Link
              href={"/login"}
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-tighter rounded-sm transition-all transform hover:skew-x-[-10deg]"
            >
              Mi Cuenta
            </Link>
            <button
              className="md:hidden "
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
      </motion.nav>
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-md text-sm font-medium px-2 pb-4">
          {menuItems.map((item, i) => (
            <div key={i} className="my-1">
              <a
                href={item.href}
                className="flex pl-2 gap-2 bg-linear-to-r from-white/75 dark:from-black/20 to-transparent items-center py-1"
              >
                {renderIcon(item.icon)}
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
