"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { verifyCode, resendCode } from "@/hooks/useVerify";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function VerificarCuenta() {
  const { loading, error, user, refreshUser } = useAuth();

  // Mientras refresca usuario
  if (loading) return null;
  //if (!user) return null;
  // Solo mostramos si error === "unverified"
  if (error !== "unverified") return null;
  //SI error no es igual a univerfied mostrar pantalla

  const [code, setCode] = useState("");
  const [loadingx, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    const toastId = toast.loading("Verificando código...");

    try {
      await verifyCode(code);

      toast.success("✅ Cuenta verificada", { id: toastId });
      await refreshUser();
      // router.replace("/dashboard");
    } catch (err: any) {
      toast.error("❌ Código inválido", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    const toastId = toast.loading("Reenviando código...");

    try {
      await resendCode();
      toast.success("📩 Código reenviado", { id: toastId });
    } catch {
      toast.error("❌ Error al reenviar", { id: toastId });
    } finally {
      setResending(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-sm space-y-4 border border-zinc-800">
        <h2 className="text-xl font-bold text-center">Verifica tu cuenta</h2>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de 6 dígitos"
          className="w-full text-center text-2xl tracking-widest bg-zinc-800 rounded-lg py-2 outline-none"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded-lg"
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full text-sm text-blue-400"
        >
          {resending ? "Reenviando..." : "Reenviar código"}
        </button>
      </div>
    </div>
  );
}
