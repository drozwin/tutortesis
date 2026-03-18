"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/types/liveCursos";
import EnrollButton from "./EnrollButtonpagina";
export default function MultiCourseRedSlider() {
  const { data, isLoading, error } = useCourses();

  const courses: Course[] = (data ?? []).slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCourse = () =>
    setCurrentIndex((prev) => (prev + 1) % courses.length);

  const prevCourse = () =>
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);

  if (isLoading) return <p>Cargando cursos...</p>;
  if (error) return <p>Error cargando cursos</p>;
  if (courses.length === 0) return null;

  const course = courses[currentIndex];

  return (
    <div className="w-full flex items-center justify-center flex-col">
      {/* titulo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-row py-2 mt-8 gap-5 justify-center items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Video className="text-red-600 w-12 h-12" />
        </motion.div>

        <h1 className="text-3xl text-zinc-500 font-black italic uppercase">
          Cursos en Vivo
        </h1>
      </motion.div>

      {/* slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 bg-slate-200 dark:bg-zinc-950 rounded-2xl overflow-hidden"
        >
          {/* imagen */}
          <div className="md:col-span-5">
            <img
              src={course.image ?? "/placeholder.jpg"}
              className="w-full h-full object-cover"
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
              <div className="text-red-500 text-2xl">
                {course.price == null || course.price < 0 ? (
                  "Gratis"
                ) : (
                  <div>
                    <span>Costo</span>
                    <span> Bs. {course.price}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <EnrollButton course={course} />
                {/* navegación */}
                <div className="flex gap-4 items-center">
                  <button onClick={prevCourse}>Atras</button>

                  <span className="text-zinc-500 font-mono text-xl">
                    {currentIndex + 1} / {courses.length}
                  </span>

                  <button onClick={nextCourse}>Siguiente</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
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
