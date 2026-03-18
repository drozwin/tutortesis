"use client";

import { useState } from "react";

export const MenuPerfil = () => {
  const [open, setOpen] = useState(false);


  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" className="flex items-center gap-2">
        <img
          src="https://images.unsplash.com/photo-1472099645"
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg text-black z-50">
          <div>nombre</div>
          <a href="/perfil" className="block px-4 py-2 hover:bg-gray-200 rounded-t-md">
            Mi Perfil
          </a>
          <a href="/mis-compras" className="block px-4 py-2 hover:bg-gray-200">
            Mis Compras
          </a>
          <a href="/ajustes" className="block px-4 py-2 hover:bg-gray-200">
            Ajustes
          </a>
          <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-b-md">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
