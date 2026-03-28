// components/ProductSkeleton.tsx
import { motion } from "framer-motion";

export const ProductSkeleton = () => (
  <div className="relative bg-black border border-white/10 rounded-xl p-4 overflow-hidden h-[400px]">
    {/* Efecto Shimmer (Brillo que pasa) */}

    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12"
    />
    {/* Espacio para la imagen */}
    <div className="w-full h-48 bg-zinc-400/30 rounded-lg mb-4" />
    {/* Líneas de texto */}
    <div className="space-y-3">
      <div className="h-4 bg-white/20 rounded w-3/4" />
      <div className="h-3 bg-zinc-400/30 rounded w-full" />
      <div className="h-3 bg-zinc-400/30 rounded w-5/6" />
    </div>
    {/* Botón fake */}
    <div className="absolute bottom-4 left-4 right-4 h-10 bg-zinc-500/20 rounded-full" />
  </div>
);

export const ProductSkeletonError = () => (
  <div className="relative bg-zinc-200 shadow-lg dark:bg-black/30 border border-white/10 rounded-xl p-4 overflow-hidden h-[400px]">
    <span className="absolute inset-0 items-center flex justify-center w-full h-20 translate-y-4/5">
      <div className="flex flex-col">
        <span>Error al cargar los datos </span>
        <span className="animate-pulse text-red-500">
          Reintentando conexión...
        </span>
      </div>
    </span>
    <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12" />
    {/* Espacio para la imagen */}
    <div className="w-full h-48 bg-zinc-400/30 rounded-lg mb-4" />

    {/* Líneas de texto */}
    <div className="space-y-3">
      <div className="h-4 bg-zinc-400/30 rounded w-3/4" />
      <div className="h-3 bg-zinc-400/30 rounded w-full" />
      <div className="h-3 bg-zinc-400/30 rounded w-5/6" />
    </div>
    {/* Botón fake */}
    <div className="absolute bottom-4 left-4 right-4 h-10 bg-zinc-500/20 rounded-full" />
  </div>
);
