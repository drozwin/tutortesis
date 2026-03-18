"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { login } from "@/services/authService";
import { persistAuthToken } from "@/persist/AuthPersistence";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";
  const { refreshUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await login({ email, password });

      if (response.token) {
        await persistAuthToken(response.token);
      }

      // Guardar hora local en cookie ilegible con expiración del backend
      const localTime = new Date().toString();
      const encodedTime = btoa(localTime); // base64

      const expiresInSeconds = response.expires_in ?? 7200; // fallback 1h
      const expiresDate = new Date(
        Date.now() + expiresInSeconds * 1000,
      ).toUTCString();

      document.cookie = `timezone=${encodedTime}; expires=${expiresDate}; path=/; SameSite=Lax; Secure`;

      // Redirigir al dashboard
      await refreshUser();
      router.replace(redirect);
    } catch (err: any) {
      setMessage("❌ Error en login: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="relative w-full max-w-md">
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              LOGIN
            </h2>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
              Inicia sesión en la red
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                placeholder="user@network.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
                placeholder="••••••••"
              />
            </div>

            {message && (
              <p className="text-center text-sm text-red-400">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-lg p-[1px] font-bold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all"></div>
              <div className="relative bg-black rounded-lg py-3">
                <span className="text-white uppercase tracking-widest text-sm">
                  {loading ? "Cargando..." : "Autenticar"}
                </span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
