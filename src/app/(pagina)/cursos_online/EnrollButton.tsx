"use client";

import { useState } from "react";
import { useCheckout } from "@/hooks/useCheckout";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Zap, Ticket } from "lucide-react";

export default function EnrollButton({
  courseId,
  ifcoupon,
  discount_porcentaje,
}: {
  courseId: number;
  ifcoupon: Boolean;
  discount_porcentaje: number;
}) {
  const [coupon, setCoupon] = useState(""); // Estado para el cupón
  const { mutate, isPending } = useCheckout();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  function handleEnroll() {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    mutate(
      { courseId, couponCode: coupon },
      {
        onSuccess: (data: any) => {
          if (data.approval_url) {
            window.location.assign(data.approval_url);
          }
        },
        onError: (error: any) => {
          console.error("Error backend:", error);
          alert(error.message || "Error al procesar el cupón o el pago");
        },
      },
    );
  }

  return (
    <div className="space-y-4 w-full">
      {ifcoupon ? (
        <>
          <div className="text-zinc-500 ">
            Si tienes cupón puedes tener hasta{" "}
            <span className="text-red-500">{discount_porcentaje}%</span> de
            descuento.
          </div>

          <div className="relative group">
            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="¿Tienes un cupón?"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-red-500/50 transition-all font-mono tracking-widest"
              maxLength={12}
            />
          </div>
        </>
      ) : (
        ""
      )}

      {/* BOTÓN DE COMPRA */}
      <button
        onClick={handleEnroll}
        disabled={isPending}
        className="flex w-full cursor-pointer text-white items-center justify-center gap-3 bg-red-600 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            PROCESANDO...
          </span>
        ) : (
          <>
            <Zap size={20} fill="currentColor" />
            COMPRAR AHORA
          </>
        )}
      </button>

      <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest font-bold">
        Pago seguro vía PayPal
      </p>
    </div>
  );
}
