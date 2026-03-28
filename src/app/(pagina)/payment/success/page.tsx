"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/fetch";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [status, setStatus] = useState("processing"); // processing | success | error
  const hasCalled = useRef(false); // Para evitar doble llamada en React Strict Mode

  useEffect(() => {
    if (!token || hasCalled.current) return;
    hasCalled.current = true;

    apiClient<{status: string, order_id: number}>(`/paypal/capture/${token}`, {
      method: "POST",
    })
      .then((data) => {
        setStatus("success");
        // Redirigir después de 2 segundos para que el usuario vea el éxito
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 2500);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });

  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      {status === "processing" && (
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h1 className="text-2xl font-semibold">Confirmando tu pago...</h1>
          <p className="text-gray-500">Por favor, no cierres esta ventana.</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <div className="text-6xl text-green-500">✅</div>
          <h1 className="text-3xl font-bold text-green-600">¡Pago completado con éxito!</h1>
          <p className="text-gray-600 text-lg">Ya tienes acceso a tu curso. Redirigiendo al panel...</p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <div className="text-6xl text-red-500">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Ocurrió un problema</h1>
          <p className="text-gray-600">No pudimos procesar tu inscripción automáticamente. Por favor contacta a soporte.</p>
          <button 
            onClick={() => router.push("/contacto")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Contactar Soporte
          </button>
        </div>
      )}
    </div>
  );
}