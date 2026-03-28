"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ProductSkeleton, ProductSkeletonError } from "./ProductSkeleton";

export default function PublicStore() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isPlaceholderData, isFetching } =
    useProducts(page);

  // ✅ REFS CORRECTOS
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const paginationRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });
  const paginationInView = useInView(paginationRef, { once: true });

  const currentPage = data?.current_page || page;
  const lastPage = data?.last_page || 1;
  const showSkeletons = isLoading || (isFetching && isPlaceholderData);

  const heroVariants = {
    hidden: {
      y: 80,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  // ✅ ITEMS (cards)
  const item = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // ✅ CONTAINER (stagger)
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <div className="min-h-screen text-zinc-600 dark:text-zinc-200">
      {/* HERO */}
      <section
        ref={gridRef}
        className="relative pt-32 pb-20 overflow-hidden text-center px-4"
      >
        <motion.h1
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={container}
          className="text-6xl md:text-8xl font-black tracking-tighter bg-linear-to-b from-white via-gray-400 to-gray-800 bg-clip-text text-transparent mb-8"
        >
          CURSOS <br /> ESTRATÉGICOS
        </motion.h1>

        <motion.p
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={container}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg font-mono uppercase tracking-widest leading-loose"
        >
          Desbloquea tu potencial académico <br />
          Tesis | Proyectos | APA 7 Y MUCHOS MAS...
        </motion.p>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto pb-12 px-4">
        <div className="flex items-center gap-4 pb-8">
          <div className="h-1 w-12 bg-red-500"></div>
          <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase font-mono">
            Módulos Disponibles
          </span>
        </div>

        {/* GRID */}
        <AnimatePresence mode="sync">
          <motion.div
            key={page}
            ref={gridRef}
            variants={container}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {error ? (
              <div className="col-span-full py-10">
                <ProductSkeletonError />
              </div>
            ) : showSkeletons ? (
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={item}>
                  <ProductSkeleton />
                </motion.div>
              ))
            ) : (
              data?.data.map((product: any) => (
                <motion.div
                  key={product.id}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* PAGINACIÓN */}
        <motion.div
          ref={paginationRef}
          initial={{ opacity: 0, y: 40 }}
          animate={paginationInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-8 justify-center mt-16 items-center"
        >
          <button
            disabled={page === 1 || isFetching}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/10 disabled:opacity-20 transition-all"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">
              Atrás
            </span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <div className="text-center min-w-[120px]">
            <p className="text-[10px] text-gray-600 font-mono mb-1 uppercase tracking-tighter">
              Estado_Pag
            </p>
            <span
              className={`font-mono text-xl font-bold transition-all duration-300 ${
                isFetching ? "text-cyan-500 animate-pulse" : "text-red-500"
              }`}
            >
              {String(currentPage).padStart(2, "0")} /{" "}
              {String(lastPage).padStart(2, "0")}
            </span>
          </div>

          <button
            disabled={page === lastPage || isFetching}
            onClick={() => setPage((prev) => prev + 1)}
            className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/10 disabled:opacity-20 transition-all"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">
              Siguiente
            </span>
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
