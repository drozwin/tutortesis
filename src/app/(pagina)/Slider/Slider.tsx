"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SliderItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

const mockBackendData: SliderItem[] = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: i + 1,
    title: `Proyecto Galaxia ${i + 1}`,
    description:
      "Implementación de protocolos cuánticos para transferencia de datos en tiempo real.",
    category: "SISTEMA-CORE",
    image: `https://picsum.photos/seed/${i + 40}/1600/900`,
  }),
);

export default function FuturisticSlider() {
  const [items, setItems] = useState<SliderItem[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setItems(mockBackendData.slice(0, 5));
  }, []);

  // AUTOPLAY 10s
  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [items, index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items.length) return null;

  const currentItem = items[index];

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* SLIDES */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={currentItem.image}
            className="w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white/70 mb-6 leading-tight">
                {currentItem.title}
              </h2>

              <p className="text-gray-300 mb-8 text-lg">
                {currentItem.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* BOTONES */}
      <button
        onClick={prevSlide}
        className="absolute pb-3 text-3xl w-16 h-16 left-6 top-4/5 -translate-y-1/2 bg-black/40 backdrop-blur rounded-full hover:bg-red-600/90 transition"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute pb-3 text-3xl w-16 h-16  right-6 top-4/5 -translate-y-1/2 bg-black/40 backdrop-blur rounded-full hover:bg-red-600/90 transition"
      >
        →
      </button>

      {/* INDICADORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 ${
              i === index
                ? "w-10 bg-red-600 shadow-[0_0_10px_#fff]"
                : "w-4 bg-red-950"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
