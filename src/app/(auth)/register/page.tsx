"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";
  const { register } = useRegister();
  const { refreshUser, loading, user, error } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    apellidos: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // No ocultar el formulario mientras refreshUser corre después del submit (loading + submitting).
  if ((loading && !submitting) || user) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    const toastId = toast.loading("Creando cuenta...");

    try {
      // 1. Ejecutamos el registro (esto debería guardar el token en cookies/localStorage)
      const response = await register({ ...form });

      if (!response) {
        throw new Error("Error en el servidor al registrar");
      }

      const { error: authError } = await refreshUser();

      const redirectParam = encodeURIComponent(redirect);
      if (authError === "unverified") {
        toast.success("✅ Registro completado", { id: toastId });
        router.replace(`/verificar-cuenta?redirect=${redirectParam}`);
      } else if (authError === "banned") {
        toast.success("✅ Registro completado", { id: toastId });
        router.replace("/account-banned");
      } else if (!authError) {
        toast.success("✅ Registro completado", { id: toastId });
        router.replace(redirect);
      } else {
        toast.error(
          "Cuenta creada, pero no se pudo cargar la sesión. Prueba iniciar sesión.",
          { id: toastId },
        );
      }
    } catch (err: any) {
      console.error(err);
      let msg = "Error al registrar";
      if (err?.data?.errors) {
        const firstError = Object.values(err.data.errors)[0] as string[];
        msg = firstError[0];
      } else {
        msg = err.message || "Error desconocido";
      }
      toast.error("❌ " + msg, { id: toastId });
      setMessage(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-zinc-900 p-6 shadow-xl border border-zinc-800"
      >
        <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>

        {[
          { name: "username", placeholder: "Usuario" },
          { name: "name", placeholder: "Nombre" },
          { name: "apellidos", placeholder: "Apellidos" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "password", placeholder: "Contraseña", type: "password" },
          {
            name: "password_confirmation",
            placeholder: "Confirmar contraseña",
            type: "password",
          },
        ].map((input) => (
          <input
            key={input.name}
            type={input.type || "text"}
            name={input.name}
            placeholder={input.placeholder}
            value={(form as any)[input.name]}
            onChange={handleChange}
            className="w-full rounded-lg bg-zinc-800 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold hover:bg-blue-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting && (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          )}
          {submitting ? "Creando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
