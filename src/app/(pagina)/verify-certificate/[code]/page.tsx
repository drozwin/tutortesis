import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCertificate(code: string) {
  const res = await fetch(`${API_URL}/verify-certificate/${code}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Certificado no válido");
  }

  return res.json();
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ code: string }>; // 👈 IMPORTANTE
}) {
  const { code } = await params; // 👈 🔥 FIX

  let data;

  try {
    data = await getCertificate(code);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ Certificado no válido o no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-xl w-full p-8 rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
          ✔ Certificado Verificado
        </h1>

        <div className="space-y-3 text-center">
          <p>
            <strong>Nombre:</strong> {data.name} {data.apellidos}
          </p>

          <p>
            <strong>Curso:</strong> {data.course}
          </p>

          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-xs text-zinc-500 mt-4 text-center">
          Código: {code}
        </p>
      </div>
    </div>
  );
}