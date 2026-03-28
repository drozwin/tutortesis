"use client";
const MI_WEB_COM = process.env.NEXT_PUBLIC_URL;
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {AuthRequiredDialog} from '@/components/ui/AuthRequiredDialog';
import { useRouter, usePathname, useParams } from "next/navigation";
import PaymentModal from "./PaymentModal";

import {
  Calendar,
  Clock,
  BarChart,
  Award,
  Users,
  Video,
  CheckCircle,
  Timer,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCourse } from "@/hooks/useCourses";
import EnrollButton from "../EnrollButton";
interface CourseDescriptionProps {
  htmlContent: string;
}

export const CourseDescription = ({ htmlContent }: CourseDescriptionProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 rounded-3xl">
      {/* RENDERIZADO DEL HTML COMPLETO */}
      <article
        className=" leading-relaxed 
          [&>h1]:text-3xl [&>h1]:font-bold  [&>h1]:mb-6 [&>h1]:mt-8
          [&>h2]:text-xl [&>h2]:font-semibold  [&>h2]:mb-4 [&>h2]:mt-6
          [&>p]:mb-4 [&>p]:text-sm md:[&>p]:text-base
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul]:space-y-2
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>ol]:space-y-2
          [&>blockquote]:border-l-4  [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
           [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-xs
          [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:my-6 [&>pre]:overflow-x-auto
          [&>img]:rounded-2xl [&>img]:border"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};
export default function CourseDetailPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const courseId = Number(params.id);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { data: course, isLoading, error } = useCourse(courseId);
  const paypalLink = "https://www.paypal.com/paypalme/tesistutor";
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  // Lógica para calcular tiempo restante hasta start_date
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!course?.start_date) return;

    const timer = setInterval(() => {
      const start = new Date(course.start_date).getTime();
      const now = new Date().getTime();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("¡Ya comenzó!");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        // if (diff < 1000 * 60 * 60) {
        //   setTimeLeft(`${minutes}m ${seconds}s`);
        // }
        // if (diff < 1000 * 60) {
        //   setTimeLeft(`${seconds}s`);
        // }
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [course]);

  if (isLoading)
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error || !course)
    return (
      <div className="min-h-screen  flex items-center justify-center text-red-500">
        Error al cargar el curso
      </div>
    );

  const finalPrice =
    course.price - course.price * (course.discount_percent / 100);

  return (
    <div className="min-h-screen pb-20">
      {/* GLOW EFFECT */}
      <div className=" pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-32 px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* COLUMNA IZQUIERDA: IMAGEN Y DETALLES */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-md shadow-black/30 "
            >
              <img
                src={`${MI_WEB_COM}/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              {/* PLATAFORMA BADGE */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <Video size={18} className="text-red-500" />
                <span className="text-sm font-bold">
                  Vía {course.plataforma}
                </span>
              </div>
            </motion.div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 p-4 rounded-2xl border border-white/5 text-center">
                <BarChart size={20} className="mx-auto mb-2 text-blue-400" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Nivel
                </p>
                <p className="text-sm font-semibold">{course.level}</p>
              </div>
              <div className="bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 p-4 rounded-2xl border border-white/5 text-center">
                <Clock size={20} className="mx-auto mb-2 text-green-400" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Duración
                </p>
                <p className="text-sm font-semibold">{course.duration}h</p>
              </div>
              <div className="bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 p-4 rounded-2xl border border-white/5 text-center">
                <Award size={20} className="mx-auto mb-2 text-yellow-400" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Certificado
                </p>
                <p className="text-sm font-semibold">
                  {course.has_certificate ? "Sí" : "No"}
                </p>
              </div>
              <div className="bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 p-4 rounded-2xl border border-white/5 text-center">
                <Users size={20} className="mx-auto mb-2 text-purple-400" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Cupos
                </p>
                <p className="text-sm font-semibold">{course.max_students}</p>
              </div>
            </div>

            <div className="p-8 bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 rounded-3xl  border border-white/5">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                Descripción del curso
              </h2>
              <article className="text-zinc-500 leading-relaxed text-justify">
                <CourseDescription htmlContent={course.description} />
              </article>
            </div>
          </div>

          {/* COLUMNA DERECHA: INSCRIPCIÓN */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 rounded-3xl  border border-white/10">
                {/* COUNTDOWN BADGE */}
                <div className="flex items-center gap-2 text-red-500 mb-6 bg-red-500/10 w-fit px-4 py-1.5 rounded-full border border-red-500/20">
                  <Timer size={16} className="animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    {timeLeft}
                  </span>
                </div>

                <h1 className="text-4xl font-black mb-2">{course.title}</h1>
                <p className="text-zinc-500 text-sm mb-8 italic">
                  {course.category}
                </p>

                {/* PRICE SECTION */}
                <div className="mb-10 p-6 bg-white/50 dark:bg-zinc-900/50  shadow-md shadow-black/30 rounded-3xl border border-white/5 relative overflow-hidden">
                  {course.has_coupon == true ? (
                    <span className="text-5xl font-black text-zinc-500">
                      $ {course.price.toFixed(0)}
                    </span>
                  ) : (
                    <>
                      {course.price > 0 ? (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3">
                            <span className="text-5xl font-black text-zinc-500">
                              $ {finalPrice.toFixed(0)}
                            </span>
                            {course.discount_percent > 0 && (
                              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md">
                                -{course.discount_percent}%
                              </span>
                            )}
                          </div>
                          {course.discount_percent > 0 && (
                            <span className="text-zinc-500 text-sm line-through mt-1">
                              Antes: Bs {course.price}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-5xl font-black text-green-500 uppercase tracking-tighter">
                            Gratis
                          </span>
                          <Zap
                            size={24}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        </div>
                      )}
                    </>
                  )}

                  <p className="text-[10px] text-zinc-500 mt-4 flex items-center gap-1 uppercase tracking-widest font-bold">
                    <Calendar size={12} /> Inicia:{" "}
                    {new Date(course.start_date).toLocaleDateString()}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="space-y-4">
                  {course.is_enrolled ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full bg-green-600/20 text-green-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-green-600/30">
                        <CheckCircle size={20} /> YA ESTÁS INSCRITO
                      </div>
                      {/* <a 
                        href={course.url_plataforma} 
                        target="_blank" 
                        className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                      >
                        <ExternalLink size={20} /> IR A LA CLASE (ZOOM)
                      </a> */}
                    </div>
                  ) : (
                    <>
                      {/* <EnrollButton
                        courseId={course.id}
                        ifcoupon={course.has_coupon}
                        discount_porcentaje={course.discount_percent}
                      /> */}
                      <div className="grid grid-cols-1 gap-4">
                        {/* BOTÓN 1: Pago directo con PayPal */}
                        <button
                          onClick={() => {
                            if (!user) {
                              setAuthDialogOpen(true);
                              return;
                            }
                            window.open(paypalLink, "_blank");
                          }}
                          className="flex text-2xl items-center justify-center gap-3 bg-yellow-500 text-blue-700 py-4 rounded-2xl font-bold hover:bg-yellow-400 transition-all"
                        >
                          Pagar con PayPal
                        </button>

                        {/* BOTÓN 2: Abrir modal con QR y upload de comprobante */}
                        <button
                          onClick={() => {
                            if (!user) {
                              setAuthDialogOpen(true);
                              return;
                            }
                            setModalOpen(true);
                          }}
                          className="flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all"
                        >
                          Pagar con QR o transferencia
                        </button>
                      </div>
                    </>
                  )}
                  <PaymentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    productId={course.id}
                    productTitle={course.title}
                    paypalLink={paypalLink}
                  />
                  <AuthRequiredDialog
                    open={authDialogOpen}
                    onOpenChange={setAuthDialogOpen}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between text-zinc-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {course.students_count} inscritos
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} /> Garantía de acceso
                    </span>
                  </div>
                </div>
              </div>

              {/* COUPON CARD (Si aplica) */}
              {/* {course.coupon_code && (
                <div className="p-4 bg-linear-to-r from-red-900/20 to-zinc-900 rounded-2xl border border-red-500/20 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-lg"><Zap size={16} /></div>
                    <div>
                      <p className="text-[10px] text-red-400 font-bold uppercase">Cupón disponible</p>
                      <p className="font-mono text-sm">{course.coupon_code}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors">COPIAR</button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
