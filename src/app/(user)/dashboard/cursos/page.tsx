"use client";
import { useCreateProduct } from "@/hooks/useProducts";
import { useState } from "react";

function ProductForm() {
  const { mutate, isPending } = useCreateProduct();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Datos del formulario (puedes usar react-hook-form aquí)
    const formData = {
      title: "Curso Pro de Next.js",
      type: "digital",
      category_id: 1,
      tags: { 1:"tesis"},
      original_price: 99.99,
      description: "Aprende de 0 a 100",
      status: "published",
    };

    mutate(
      { formData, files: selectedFiles },
      {
        onSuccess: () => alert("¡Producto y videos subidos!"),
        onError: (err: any) => {
          console.log("Status Code:", err.status);
          console.log("Detalles del Backend:", err.data); // Aquí verás los errores de validación de Laravel
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        className="bg-slate-800 p-2 rounded w-full"
      />

      <div className="border-2 border-dashed border-slate-700 p-10 rounded-xl text-center">
        <label className="cursor-pointer text-blue-400">
          Seleccionar Carpeta HLS
          <input
            type="file"
            hidden
            //@ts-ignore
            webkitdirectory="true"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
          />
        </label>
        {selectedFiles.length > 0 && (
          <p className="mt-2 text-sm text-green-400">
            {selectedFiles.length} archivos listos
          </p>
        )}
      </div>

      <button
        disabled={isPending}
        className="bg-blue-600 px-6 py-2 rounded-lg font-bold disabled:opacity-50"
      >
        {isPending ? "Subiendo..." : "Crear Producto"}
      </button>
    </form>
  );
}
export default ProductForm;
