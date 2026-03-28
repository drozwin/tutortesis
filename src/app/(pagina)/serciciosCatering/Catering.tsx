"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, Transition, AnimatePresence } from "framer-motion";

export const Catering = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Detectamos la entrada con un margen para que no dispare tarde
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const phone = "75258593";
  const message = "Hola, quiero información sobre el servicio de catering";

  // Configuración de animación Fluida (Sin saltos)
  const variants = {
    hidden: {
      y: 80,
      opacity: 1,
    },
    visible: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <div className="pt-16 mb-8 px-4" ref={ref}>
      {/* TÍTULO */}
      <motion.h2
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className="py-8 text-2xl md:text-3xl font-mono text-zinc-500 uppercase text-center font-bold tracking-[0.4em]"
      >
        Servicio de Catering
      </motion.h2>

      {/* CARD */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-12 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-500/15 shadow-md shadow-black/50 rounded-3xl hover:border-red-600/40 overflow-hidden transition-colors duration-500"
      >
        {/* Imagen con Zoom Suave */}
        <div className="md:col-span-5 overflow-hidden h-64 md:h-auto">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/catering.webp"
            className="w-full h-full object-cover"
            alt="Catering"
          />
        </div>

        {/* Contenido */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3">
              Eventos de Graduación & Estratégicos
            </h3>

            <p className="text-sm text-zinc-500 leading-relaxed">
              Ofrecemos servicio de catering de alto nivel para todo tipo de
              protocolos: graduaciones, eventos corporativos y celebraciones
              académicas.
            </p>

            <ul className="mt-6 text-sm text-zinc-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-red-600"></span> Menús
                personalizados
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-red-600"></span> Atención
                profesional (Etiqueta)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-red-600"></span> Logística integral
              </li>
            </ul>
          </div>

          {/* BOTONES ESTILO TERMINAL */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              className="flex-1 bg-green-600/10 border border-green-600/50 hover:bg-green-600 text-green-400 hover:text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center"
            >
              WhatsApp_Link
            </a>

            <button
              onClick={() => setOpen(true)}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              Enviar_Consulta
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL CON ANIMACIÓN LIMPIA */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-6 text-white font-mono uppercase tracking-tighter">
                Solicitar Protocolo
              </h3>

              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="NOMBRE_USUARIO"
                  className="p-3 rounded-xl bg-black/50 border border-white/5 text-white outline-none focus:border-red-600 transition-colors font-mono text-sm"
                />
                <textarea
                  placeholder="DETALLES_DEL_EVENTO"
                  rows={4}
                  className="p-3 rounded-xl bg-black/50 border border-white/5 text-white outline-none focus:border-red-600 transition-colors font-mono text-sm"
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white text-xs font-bold uppercase tracking-widest"
                  >
                    Confirmar_Envío
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
