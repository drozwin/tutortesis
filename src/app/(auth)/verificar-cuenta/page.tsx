"use client";

import { useAuth } from "@/context/AuthContext";

export default function VerificarCuenta() {
  const { loading, error, user } = useAuth();

  // Mientras refresca usuario
  if (loading) return null;
  if (!user) return null;
  // Solo mostramos si error === "unverified"
  if (error !== "unverified") return null;
  //SI error no es igual a univerfied mostrar pantalla
  return (
    <div>
      <h1>Verificar tu cuenta</h1>
      <p>Por favor revisa tu email y confirma tu cuenta.</p>
    </div>
  );
}
