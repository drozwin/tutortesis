"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AuthRequiredDialog } from "@/components/ui/AuthRequiredDialog";
import {
  Eye,
  Heart,
  Download,
  Star,
  ShoppingCart,
  Play,
  ShieldCheck,
  Zap,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useProductDetail } from "@/hooks/useProducts";
import PaymentModal from "./PaymentModal";
// import { useAddCart } from "@/hooks/useCart";
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

export default function ProductDetailPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProductDetail(id);
  const { user } = useAuth();
  // const addCart = useAddCart();
  const paypalLink = "https://www.paypal.com/paypalme/tesistutor";
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  // Helper para extraer ID de Youtube
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") return urlObj.pathname.slice(1);
      if (urlObj.hostname.includes("youtube.com"))
        return urlObj.searchParams.get("v");
      return null;
    } catch {
      return null;
    }
  };

  const youtubeId = getYouTubeId(data?.video_preview_url);

  if (isLoading)
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="tanimate-pulse font-mono tracking-widest uppercase">
          Cargando Tesis...
        </p>
      </div>
    );

  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        ERROR AL CARGAR EL PRODUCTO
      </div>
    );

  // descuento
  const originalPrice = Number(data.price) || 0;
  const discountPercentage = Number(data.discount_percentage) || 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = Math.max(originalPrice - discountAmount, 0);

  return (
    <div className="min-h-screen text-zinc-500 pb-20">
      {/* BACKGROUND ORB */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]  blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto pt-32 px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* COLUMNA IZQUIERDA: MEDIA */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-500/15 shadow-md"
            >
              {youtubeId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                  title={data.title}
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={data.thumbnail}
                  className="w-full h-full object-cover"
                  alt={data.title}
                />
              )}
            </motion.div>

            {/* STATS BAR */}
            <div className="flex items-center  justify-between p-6 cardBG border border-zinc-500/15  shadow-md shadow-black/30 rounded-2xl">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-tighter mb-1">
                    Vistas
                  </p>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Eye size={16} className="text-blue-400" /> {data.views}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-tighter mb-1">
                    Descargas
                  </p>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Download size={16} className="text-green-400" />{" "}
                    {data.downloads}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-tighter mb-1">
                    Likes
                  </p>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Heart size={16} className="text-red-500" /> {data.likes}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-black text-yellow-400">
                    {data.rating || "5.0"}
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPCION COMPLETA */}
            <div className="p-8 cardBG border border-zinc-500/15 shadow-md rounded-2xl shadow-black/30  ">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap size={20} className="text-red-500" /> Información Detallada
              </h2>
              <div className="prose prose-invert max-w-none">
                <article className="text-zinc-400 max-h-[768px] overflow-auto leading-relaxed whitespace-pre-line text-justify">
                  <CourseDescription
                    htmlContent={
                      data.description ||
                      "Este producto no cuenta con una descripción detallada en este momento."
                    }
                  ></CourseDescription>
                </article>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: COMPRA (STICKY) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 cardBG border border-zinc-500/15 shadow-md shadow-black/30 rounded-2xl relative overflow-hidden">
                {/* Categoría */}
                <span className="inline-block px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  {data.category.name}
                </span>

                <h1 className="text-4xl font-black leading-tight mb-6">
                  {data.title}
                </h1>

                {/* PRECIO BOX */}
                <div className="p-6 dark:bg-black/40 bg-slate-200 text-zinc-700 dark:text-zinc-100 rounded-2xl border border-black/10 mb-8">
                  {data.has_discount ? (
                    <div className="flex items-end gap-4">
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-sm line-through decoration-red-500/50">
                          Bs {data.price}
                        </span>
                        <span className="text-5xl font-black ">
                          $ {finalPrice}
                        </span>
                      </div>
                      <div className="mb-1">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg animate-bounce">
                          -{data.discount_percentage}% OFF
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-5xl font-black text-white">
                      Bs {data.price}
                    </span>
                  )}
                  <p className="text-[10px] text-zinc-500 mt-4 flex items-center gap-1 italic">
                    <ShieldCheck size={12} /> Compra segura. Acceso instantáneo
                    tras el pago.
                  </p>
                </div>

                {/* ACCIONES */}
                {/* <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => addCart.mutate({ product_id: data.id, quantity: 1 })}
                    disabled={addCart.isPending}
                    className="group relative flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all overflow-hidden"
                  >
                    <ShoppingCart size={20} />
                    {addCart.isPending ? "PROCESANDO..." : "AÑADIR AL CARRITO"}
                    <div className="absolute inset-0 bg-red-600/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>

                  <button className="flex text-white items-center justify-center gap-3 bg-red-600 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                    <Zap size={20} fill="currentColor" />
                    COMPRAR AHORA
                  </button>
                </div> */}
                {/* Dentro de tu columna de compra, reemplaza tu botón COMPRAR AHORA */}
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

                <PaymentModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  productId={data.id}
                  productTitle={data.title}
                  paypalLink={paypalLink}
                />
                <AuthRequiredDialog
                  open={authDialogOpen}
                  onOpenChange={setAuthDialogOpen}
                />
                {/* BENEFICIOS */}
                <div className="mt-8 pt-8 border-t border-zinc-500/15 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    Acceso de por vida
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Download size={16} />
                    </div>
                    Material descargable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN COMENTARIOS REIMAGINADA */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <MessageSquare className="text-red-600" /> Feedback{" "}
              <span className="text-zinc-600">({data.rating || 3})</span>
            </h2>
            <button className="text-red-500 text-sm font-bold border-b border-red-500/20 hover:border-red-500 transition-all">
              Ver todas las reseñas
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="p-6 cardBG border border-zinc-500/15  shadow-md shadow-black/30 rounded-3xl hover:border-red-600/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-red-600 to-amber-500" />
                    <div>
                      <p className="font-bold text-sm">Estudiante Pro</p>
                      <p className="text-[10px] text-zinc-500">Hace 2 días</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    <Star size={12} fill="currentColor" />{" "}
                    <Star size={12} fill="currentColor" />{" "}
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-500 transition-colors">
                  "El material es excelente. El formato APA viene muy bien
                  explicado y me ahorró horas de trabajo."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
