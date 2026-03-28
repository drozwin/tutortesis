"use client";
import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

const comentarios = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  name: "Estudiante Pro",
  text: "El material es excelente. El formato APA viene muy bien explicado y me ahorró horas de trabajo.",
}));

export const SliderComentarios = () => {
  const visible = 3;
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // ✅ CLONES (loop infinito)
  const extended = [
    ...comentarios.slice(-visible),
    ...comentarios,
    ...comentarios.slice(0, visible),
  ];

  const [current, setCurrent] = useState(visible);
  const [transition, setTransition] = useState(true);

  // ✅ ANIMACIONES
  const fadeUp: Variants = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  // loop infinito
  useEffect(() => {
    if (current === extended.length - visible) {
      const id = setTimeout(() => {
        setTransition(false);
        setCurrent(visible);
      }, 500);
      return () => clearTimeout(id);
    }

    if (current === 0) {
      const id = setTimeout(() => {
        setTransition(false);
        setCurrent(comentarios.length);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [current, extended.length, visible]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  return (
    <div className="overflow-hidden space-y-7 pt-24" ref={ref}>
      
      {/* TITLE */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-5xl uppercase text-zinc-500 text-center font-bold"
      >
        Escucha a quienes ya forman parte de nosotros
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        Descubre lo que opinan otros sobre nuestros cursos y tras tener buenos resultados.
      </motion.p>

      {/* SLIDER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
        className="overflow-hidden cardBG rounded-2xl"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`flex ${
            transition ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{
            width: `${(extended.length / visible) * 100}%`,
            transform: `translateX(-${(current * 100) / extended.length}%)`,
          }}
        >
          {extended.map((itemData, i) => (
            <motion.div key={i} variants={item} className="px-2">
              <div className="basis-1/3 pl-4 py-6 border-red-600 border-l rounded-3xl">
                <div className="flex justify-between mb-4">
                  <p className="font-bold text-sm">{itemData.name}</p>
                  <div className="flex text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <p className="text-sm text-zinc-400">"{itemData.text}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CONTROLES */}
      <div className="flex justify-center gap-6">
        <button
          onClick={prev}
          className="px-4 py-2 border rounded hover:bg-zinc-800 transition"
        >
          ←
        </button>
        <button
          onClick={next}
          className="px-4 py-2 border rounded hover:bg-zinc-800 transition"
        >
          →
        </button>
      </div>
    </div>
  );
};