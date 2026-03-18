"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { motion, useInView, Transition } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useRef, useState } from "react";

export default function PublicStore() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);

  const heroRefs = useRef<(HTMLDivElement | null)[]>([]);
  const productsRef = useRef(null);
  const isInView = useInView(productsRef, { once: true, margin: "-100px" });

  // Configuración de animación "Suave y Gamer"
  const smoothEntrance = (delay: number) => {
    const transition: Transition = {
      duration: 0.8,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    };

    return {
      initial: { y: 60, opacity: 0, filter: "blur(10px)", scale: 0.98 },
      whileInView: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
      viewport: { once: true, margin: "-50px" },
      transition,
    };
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cyan-500 font-mono tracking-[0.3em] text-sm uppercase"
        >
          Sincronizando_Interfaz_V4
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow de fondo dinámico */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] bg-cyan-600 blur-[140px] rounded-full -top-20 left-1/2 -translate-x-1/2 -z-10"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
          <motion.h1
            {...smoothEntrance(0.1)}
            className="text-6xl md:text-8xl font-black tracking-tighter bg-linear-to-b from-white via-gray-200 to-gray-700 bg-clip-text text-transparent mb-8"
          >
            SISTEMA <br />
            ESTRATÉGICO
          </motion.h1>

          <motion.p
            {...smoothEntrance(0.3)}
            className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg font-mono uppercase tracking-widest leading-loose"
          >
            // Desbloquea el potencial académico <br />
            Protocolos: Tesis | Proyectos | APA 7
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS MAIN */}
      <main ref={productsRef} className="max-w-7xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex justify-between items-center mb-16 border-b border-white/5 pb-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">
              Módulos Disponibles
            </span>
          </div>
        </motion.div>

        {/* GRID CON STAGGER SUAVE */}
        <motion.div
          key={page}
          initial="hidden"
          whileInView="visible"
          style={{ willChange: "transform, opacity" }}
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {data?.data.map((product) => (
            <motion.div
              key={`${page}-${product.id}`}
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: "easeOut" },
                },
              }}
              whileHover={{
                y: -12,
                transition: { duration: 0.4, ease: "anticipate" },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* PAGINACIÓN ESTILO TERMINAL */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex gap-8 justify-center mt-24 items-center"
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/10 transition-all disabled:opacity-10"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase">
              Atrás
            </span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <div className="text-center">
            <p className="text-[10px] text-gray-600 font-mono mb-1">PÁGINA</p>
            <span className="font-mono text-cyan-500 text-lg font-bold">
              0{data?.current_page} <span className="text-gray-800">/</span> 0
              {data?.last_page}
            </span>
          </div>

          <button
            disabled={page === data?.last_page}
            onClick={() => setPage(page + 1)}
            className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/10 transition-all disabled:opacity-10"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase">
              Siguiente
            </span>
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
