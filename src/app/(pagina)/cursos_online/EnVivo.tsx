"use client";
const MI_WEB_COM = process.env.NEXT_PUBLIC_URL;

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { Video } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/types/liveCursos";
import EnrollButton from "./EnrollButtonpagina";

export default function MultiCourseRedSlider() {
  const { data, isLoading, error } = useCourses();
  const courses: Course[] = (data ?? []).slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const nextCourse = () =>
    setCurrentIndex((prev) => (prev + 1) % courses.length);

  const prevCourse = () =>
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);

  if (isLoading) return <p>Cargando cursos...</p>;
  if (error) return <p>Error cargando cursos</p>;
  if (courses.length === 0) return null;

  const course = courses[currentIndex];

  // ✅ Animaciones base
  const fadeUp: Variants = {
    hidden: {
      y: 50,
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

  // ✅ Animación del slider (entrada/salida)
  const slideVariants: Variants = {
    initial: {
      x: 120,
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      x: -120,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="py-4 overflow-hidden" ref={ref}>
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-row py-2 mt-8 gap-5 justify-center items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Video className="text-red-600 w-12 h-12" />
        </motion.div>

        <h2 className="py-8 text-3xl font-mono text-zinc-500 uppercase text-center font-bold tracking-[0.4em]">
          Cursos en vivo
        </h2>
      </motion.div>

      {/* SLIDER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center flex-col"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={course.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-12 rounded-3xl cardBG border border-zinc-500/15 shadow-md shadow-black/30 overflow-hidden hover:border-red-600/30"
          >
            {/* imagen */}
            <div className="md:col-span-5 overflow-hidden">
              <motion.img
                src={`${MI_WEB_COM}/${course.image}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* info */}
            <div className="md:col-span-7 p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl text-zinc-500 mb-4">{course.title}</h2>

                <CountdownTimer targetDate={course.start_date} />

                <p className="text-zinc-500 text-sm mt-4 line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="flex mt-4 gap-4 justify-between items-center">
                <div className="text-red-600 text-2xl">
                  {course.price == null || course.price < 0 ? (
                    "Gratis"
                  ) : (
                    <div className="flex gap-4 justify-center">
                      <span className="text-zinc-400">Costo</span>
                      <span className="text-3xl">$ {course.price}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <EnrollButton course={course} />

                  {/* navegación */}
                  <div className="flex gap-4 mt-2 items-center">
                    <button
                      className="cursor-pointer border rounded-md py-2 px-6 border-zinc-400"
                      onClick={prevCourse}
                    >
                      Atrás
                    </button>

                    <span className="text-zinc-500 font-mono text-xl">
                      {currentIndex + 1} / {courses.length}
                    </span>

                    <button
                      className="cursor-pointer border rounded-md py-2 px-6 border-zinc-400"
                      onClick={nextCourse}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = React.useState({ d: 0, h: 0, m: 0, s: 0 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const diff = +new Date(targetDate) - +new Date();

      if (diff <= 0) return;

      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="border-y text-center border-red-600/20 py-2">
      <div className="text-xl text-slate-400">FALTAN</div>

      <div className="flex justify-center gap-6">
        {Object.entries(timeLeft).map(([unit, val]) => (
          <div key={unit} className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {val < 10 ? `0${val}` : val}
            </div>
            <div className="text-sm uppercase text-zinc-600">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
