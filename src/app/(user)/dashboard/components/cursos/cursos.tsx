"use client";

import { useCreateProduct } from "@/hooks/useProducts";
import { useState, useMemo } from "react";
import { ProEditor } from "@/components/EditorText";
import {
  Tag,
  DollarSign,
  Calendar,
  File,
  Layers,
  Clipboard,
  Package,
  Truck,
  Eye,
  Type,
  Youtube,
  FileArchive,
  Ticket,
  RefreshCw,
  UploadCloud,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories"; // Importamos tu hook

export const ProductForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0); // Estado para el %
  const [isUploading, setIsUploading] = useState(false); // Estado para UI
  const { mutate, isPending } = useCreateProduct((p) => setUploadProgress(p));
  const { data: categories, isLoading: loadingCats } = useCategories();
  const [selectedHlsFiles, setSelectedHlsFiles] = useState<File[]>([]);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "digital",
    category_id: "",
    tags: [] as string[],
    price: 0,
    discount_percent: 0,
    status: "draft",
    starts_at: "",
    ends_at: "",
    has_shipping: false,
    shipping_cost: 0,
    stock: 0,
    thumbnail: "",
    video_preview_url: "",
    file_path: "",
    coupon_code: "",
  });
  const finalPrice = useMemo(() => {
    const price = Number(formData.price) || 0;
    const discount = Number(formData.discount_percent) || 0;
    return price - price * (discount / 100);
  }, [formData.price, formData.discount_percent]);

  const handleEditorChange = (htmlContent: string) => {
    setFormData((prev) => ({ ...prev, description: htmlContent }));

    if (fieldErrors.description) {
      setFieldErrors((prev: any) => {
        const { description, ...rest } = prev;
        return rest;
      });
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[name];
      setFieldErrors(newErrors);
    }
  };

  const generateRandomCoupon = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, coupon_code: result }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combinamos archivos HLS + el archivo ZIP/RAR
    // const allFiles = [...selectedHlsFiles];
    // if (zipFile) allFiles.push(zipFile);
    if (!zipFile) return alert("Por favor selecciona un archivo ZIP");
    // Mapeamos los nombres para el backend
    // const fileNames = allFiles.map((f) => f.webkitRelativePath || f.name);
    setIsUploading(true);
    setUploadProgress(0);
    setFieldErrors({});
    const allFiles = [...selectedHlsFiles];
    if (zipFile) allFiles.push(zipFile);

    const payload = {
      ...formData,
      price: formData.price, // El backend espera 'price'
      file_name: zipFile.name,
    };

    mutate(
      // { formData: payload, files: zipFile ? [zipFile] : [] },
      { formData: payload, files: [zipFile] },
      {
        onSuccess: () => {
          setIsUploading(false);
          alert("¡Producto y archivo subidos con éxito!");
        },
        onError: (err: any) => {
          setIsUploading(false);
          // Si el backend devuelve errores de validación (422)
          if (err.response?.data?.errors) {
            setFieldErrors(err.response.data.errors);
          }
        },
      },
    );
  };
  // Componente Reutilizable para Errores
  const ErrorMsg = ({ name }: { name: string }) =>
    fieldErrors[name] ? (
      <p className="text-red-500 text-[10px] uppercase font-bold mt-1 flex items-center gap-1 animate-pulse">
        <AlertCircle size={12} /> {fieldErrors[name][0]}
      </p>
    ) : null;
  return (
    <form onSubmit={handleSubmit} className="space-y-8 ">
      {/* SECCIÓN 1: INFORMACIÓN GENERAL */}
      <section className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-900/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full rounded-lg focus:ring-2 focus:ring-red-500 outline-none p-6">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b  pb-2">
          <Clipboard className="text-blue-400" /> Información General
        </h2>
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Título del Producto</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Curso de Next.js Avanzado"
            className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-3"
            required
          />
          <ErrorMsg name="title" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              URL Preview (YouTube)
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-3.5 w-4 h-4 text-red-500" />
              <input
                type="url"
                name="video_preview_url"
                value={formData.video_preview_url}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Categoría</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-3"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ErrorMsg name="category_id" />
          </div>
        </div>

        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 ml-1 block font-bold group-focus-within:text-red-500 transition-colors">
          Descripción
        </label>
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-md">
          <ProEditor
            value={formData.description}
            onChange={handleEditorChange}
          />
        </div>
        {/* 
        {fieldErrors.description && (
          <p className="text-red-500 text-[10px] uppercase font-mono mt-1">
            {fieldErrors.description[0]}
          </p>
        )} */}
      </section>

      {/* SECCIÓN 2: TIPO Y PRECIOS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-900/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full rounded-lg focus:ring-2 focus:ring-red-500 outline-none p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4">
            <DollarSign className="text-yellow-400" /> Finanzas
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Precio ($)</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-3"
              />
              <ErrorMsg name="price" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Descuento (%)</label>
              <input
                type="number"
                name="discount_percent"
                max="100"
                onChange={handleChange}
                className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-3"
              />
            </div>
            {/* PREVIEW DEL PRECIO FINAL */}
          </div>
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex justify-between items-center">
            <span className="text-sm text-green-400">
              Precio final de venta:
            </span>
            <span className="text-2xl font-black text-green-500">
              ${finalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-900/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full rounded-lg focus:ring-2 focus:ring-red-500 outline-none p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-700 pb-2">
            <Calendar className="text-pink-400" /> Oferta
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400">Inicia el:</label>
              <input
                type="datetime-local"
                name="starts_at"
                value={formData.starts_at}
                onChange={handleChange}
                className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none px-3"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Finaliza el:</label>
              <input
                type="datetime-local"
                name="ends_at"
                value={formData.ends_at}
                onChange={handleChange}
                className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none px-3"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              Cupón de Descuento (8-12 caracteres)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Ticket className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                <input
                  type="text"
                  name="coupon_code"
                  value={formData.coupon_code}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      coupon_code: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="CUPON2026"
                  className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-10"
                  maxLength={12}
                />
              </div>
              <button
                type="button"
                onClick={generateRandomCoupon}
                className="shadow-black/30 text-white shadow-md bg-red-600 border dark:border-zinc-600/30 border-zinc-300/50 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="text-purple-400 w-5 h-5" />
          <span className="text-sm">Etiquetas</span>
        </div>
        <input
          type="text"
          placeholder="tag1, tag2, tag3"
          className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-10"
          onBlur={(e) =>
            setFormData((prev) => ({
              ...prev,
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== ""),
            }))
          }
        />
      </div>
      {/* SECCIÓN 3: ARCHIVOS Y MULTIMEDIA (GESTIÓN REAL DE ARCHIVOS) */}

      <div className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-900/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full rounded-lg focus:ring-2 focus:ring-red-500 outline-none p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4 text-red-500">
          <UploadCloud /> Archivo del Curso
        </h2>
        <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors">
          <input
            type="file"
            accept=".zip,.rar"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setZipFile(e.target.files?.[0] || null)}
          />
          <div className="space-y-2">
            <FileArchive
              className={`mx-auto w-12 h-12 ${zipFile ? "text-green-500" : "text-slate-500"}`}
            />
            <p className="text-sm text-slate-400">
              {zipFile ? zipFile.name : "Click o arrastra tu archivo .ZIP aquí"}
            </p>
            {zipFile && (
              <span className="text-[10px] text-green-500 font-mono">
                {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
          </div>
        </div>
        <ErrorMsg name="file_name" />
      </div>
      {/* BARRA DE PROGRESO FLOTANTE */}
      {(isPending || isUploading) && (
        <div className="fixed bottom-10 right-10 w-80 bg-black/90 backdrop-blur-xl border border-red-500/30 p-5 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.2)] z-50">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold">
                Estado del Servidor
              </p>
              <p className="text-white text-sm font-medium">
                Subiendo Masterclass...
              </p>
            </div>
            <span className="text-2xl font-black text-white">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-red-600 to-orange-500 h-full transition-all duration-500 shadow-[0_0_10px_#dc2626]"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm text-slate-400">Estado Inicial</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 w-full py-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none pl-10"
        >
          <option value="published">Publicado Inmediatamente</option>
          <option value="draft">Borrador (Oculto)</option>
        </select>
      </div>
      {/* BOTÓN FINAL */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-black text-xl tracking-tighter disabled:opacity-30 transition-all flex justify-center items-center gap-3 shadow-xl shadow-red-900/20"
        >
          {isPending || isUploading ? (
            <RefreshCw className="animate-spin" />
          ) : (
            <CheckCircle2 />
          )}
          {isPending || isUploading
            ? "PROCESANDO TRANSACCIÓN..."
            : "DESPLEGAR PRODUCTO"}
        </button>
      </div>
    </form>
  );
};
