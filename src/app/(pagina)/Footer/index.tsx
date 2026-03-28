"use client";
import { Facebook, Youtube, Send, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative justify-center bottom-0 left-0 pt-96 md:pt-100  text-gray-200">
      {" "}
      {/* GRID LINES */}
      <div className="absolute inset-0 "></div>
      <div className="absolute bottom-0 left-0 w-full -z-10">
        <img
          src="/assets/fondos/forma1.svg"
          className="
      w-full 
      h-[50vh] 
      sm:h-[50vh] 
      md:h-[40vh] 
      lg:h-[40vh] 
      object-cover 
      
    "
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="absolute items-center  bottom-16 mx-auto max-w-7xl px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* BRAND */}
          <div>
            <img src="/logo.png" width={50} height={50} />
            <p className="mt-2 text-sm">
              Plataforma estratégica para potenciar tu desarrollo académico.
            </p>
          </div>
          {/* NAVEGACIÓN */}
          <div>
            <h3 className="text-white font-semibold mb-2">Plataforma</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/cursos">Cursos</a>
              </li>
              <li>
                <a href="/servicios">Servicios</a>
              </li>
            </ul>
          </div>
          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/policias-privacidad">Términos y condiciones</a>
              </li>
              <li>
                <a href="/policias-privacidad">Política de privacidad</a>
              </li>
              <li>
                <a href="/policias-privacidad">Cookies</a>
              </li>
            </ul>
          </div>
          {/* CONTACTO */}
          <div>
            <h3 className="text-white font-semibold mb-2">Contacto</h3>
            <ul className="space-y-1 text-sm">
              <li>Email: soporte@tutortesis.com</li>
              <li>Whastapp</li>
            </ul>

            {/* REDES */}
            <div className="flex gap-4 mt-4">
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Youtube />
              </a>
              <a href="#">
                <Send />
              </a>
              <a href="#">
                <MessageCircle />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* LINEA */}
      <div className="mt-5 bg-linear-to-r from-red-500/0 from-20% via-black/80 via-50% to-red-500/0 to-80% py-5 text-center text-xs text-gray-200">
        © 2026 Tutor Tesis. Todos los derechos reservados.
      </div>
    </footer>
  );
};
