"use client";

import { useState, useRef, useEffect } from "react";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

export default function User() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 👉 Simulación de usuario (puedes traerlo de tu context)
  const user: User = {
    name: "Joseph McFall",
    email: "name@flowbite.com",
    image: "", // si está vacío → muestra iniciales
  };

  // 🔹 Obtener iniciales
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    const first = parts[0]?.charAt(0) || "";
    const last = parts[1]?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

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

  return (
    <div className=" flex flex-wrap items-center justify-between">
      <div className="flex items-center relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-700 text-white font-semibold"
        >
          {user.image ? (
            <img
              src={user.image}
              alt="user"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute backdrop-blur-3xl bg-white/30 dark:bg-black/30 right-0 top-12 w-44 border rounded-lg shadow-lg">
            <div className="px-4 py-3 border-b border-zinc-500">
              <span className="block font-medium">{user.name}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {user.email}
              </span>
            </div>

            <ul className="p-2 text-sm ">
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-zinc-700">
                  Dashboard
                </button>
              </li>
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-zinc-700">
                  Settings
                </button>
              </li>
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-zinc-700">
                  Earnings
                </button>
              </li>
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-red-600 ">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
