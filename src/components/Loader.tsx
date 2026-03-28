import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AuthLoaderPro() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Animación base para la entrada de todos los elementos
  const entryAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">

      {/* 🌫️ Brillo ambiental detrás del texto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* 🏢 NOMBRE DE LA EMPRESA - Intermitente y con gradiente */}
        <motion.h1
          initial={entryAnimation.initial}
          animate={{
            ...entryAnimation.animate,
            opacity: [0.6, 1, 0.6], // Intermitencia suave
          }}
          transition={{
            opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="mb-2 text-3xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-4xl"
        >
          T<span className="text-red-600">T</span>
        </motion.h1>

        {/* ⏳ SUBTEXTO - Verificando */}
        <motion.p
          initial={entryAnimation.initial}
          animate={entryAnimation.animate}
          className="mb-8 text-[10px] font-medium tracking-[0.4em] text-gray-400 dark:text-zinc-500 uppercase"
        >
          Cargando...
        </motion.p>

        {/* 🔁 BARRA DE CARGA - Minimalista y rápida */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[1px] w-32 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden relative"
        >
          <motion.div
            className="absolute h-full bg-red-600"
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
            style={{ width: "40%", boxShadow: "0 0 8px rgba(37, 99, 235, 0.5)" }}
          />
        </motion.div>
      </div>

      {/* Sutil efecto de grano/textura (Opcional) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}