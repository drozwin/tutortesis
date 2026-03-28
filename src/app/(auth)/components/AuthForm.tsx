"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { initAudio } from "@/lib/audio";
import Link from "next/link";
import CustomIcon from "@/components/icons";

const fondos = [
  { id: 1, name: "/assets/fondos/1.jpg" },
  { id: 2, name: "/assets/fondos/2.jpg" },
  { id: 3, name: "/assets/fondos/3.jpg" },
];

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
  const [background, setBackground] = useState<string | null>(null);

  useEffect(() => {
    const randomFondo = fondos[Math.floor(Math.random() * fondos.length)];
    setBackground(randomFondo.name);
  }, []);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await login({ email, password });

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
  if (!background) return <div>cargando fondo</div>;
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="lg:w-1/2  w-full  flex justify-center items-center">
        <div className="flex mx-auto justify-center items-center">
          <div className="bg-linear-to-tl  dark:from-black/95 dark:to-zinc-800/75  backdrop-blur-lg shadow-black/50 border-white/10 p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <Link href={"/"} className="flex justify-center gap-2">
                <div className="py-1">
                  <img
                    src={"/logo.png"}
                    alt="TutorTesis Logo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
              {/* <div className="flex text-center justify-center">
                <span className="text-3xl font-bold text-white tracking-tight">
                  TUTOR
                </span>
                <span className="text-3xl font-bold  text-red-600 acking-tight">
                  TESIS
                </span>
              </div> */}
              <div className="flex text-center justify-center">
                <span className="text-3xl font-bold bg-linear-120 mask-b-from-0% mask-b-to-85%">
                  INGRESAR
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
                Inicia sesión en la plataforma
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">
                  Correo Electrónico
                </label>
                <span className="text-2xl h-full mt-[12px] ml-2 justify-center mx-auto mr-64 absolute">
                  <CustomIcon
                    name="email"
                    className="text-zinc-500"
                    size={24}
                  />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full shadow-inner shadow-black bg-white/50 dark:bg-zinc-900/40   rounded-full text-white focus:outline-none outline-none px-6 py-3 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 pl-10"
                  placeholder="user@mail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">
                  Contraseña
                </label>
                <span className="text-2xl h-full mt-[13px] ml-2 justify-center mx-auto mr-64 absolute">
                  <CustomIcon
                    name="password"
                    className="text-zinc-500"
                    size={20}
                  />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full shadow-inner shadow-black bg-white/50 dark:bg-zinc-900/40   rounded-full text-white focus:outline-none outline-none px-6 py-3 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 pl-10"
                  placeholder="••••••••"
                />
              </div>

              {message && (
                <p className="text-center text-sm text-red-400">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer button-login w-full rounded-full bg-linear-to-r dark:from-zinc-950 from-10% dark:via-zinc-700 via-50% dark:to-zinc-950 from-zinc-200  via-zinc-400 to-zinc-200 to-90% shadow-black shadow-md flex p-2 items-center justify-center"
              >
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="dark:text-white uppercase tracking-widest text-lg">
                  INGRESAR
                </span>
              </button>
            </form>
            {/* router.push(`/login?redirect=${pathname}`); */}
            <div className="pt-3 text-center text-zinc-500">
              ¿No tienes una cuenta?
              <Link  href={`register?redirect=${redirect}`} className="text-blue-500 ml-2 underline">
                Regístrate
              </Link>
            </div>
            <div className="pt-2 text-center">
              <Link
                href="/reset-password"
                className="text-zinc-500 ml-2 underline"
              >
                Restablecer contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 hidden lg:flex bg-cover bg-center bg-no-repeat">
        <img
          width={500}
          height={500}
          className="w-full h-full object-cover"
          src={background}
          alt="Imagen"
          loading="lazy"
        />
      </div>
    </div>
  );
}
