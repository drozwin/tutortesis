"use client";

import { useState, useEffect } from "react";
import { useCreateCourse } from "@/hooks/useCourses";
import imageCompression from "browser-image-compression";
import { ProEditor } from "@/components/EditorText";
import {
  BookOpen,
  Layers,
  Image as ImageIcon,
  Globe,
  Link as LinkIcon,
  Calendar,
  Clock,
  Award,
  DollarSign,
  Percent,
  Users,
  FileText,
  Loader2,
  Ticket,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

function buildCourseFormData(
  form: {
    title: string;
    description: string;
    category: string;
    level: string;
    plataforma: string;
    url_plataforma: string;
    start_date: string;
    duration: string;
    has_certificate: boolean;
    coupon_code: string;
    price: string;
    discount_percent: string;
    max_students: string;
    image_url: string;
  },
  imageFile: File | null,
): FormData {
  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("description", form.description);
  fd.append("category", form.category);
  fd.append("level", form.level);
  fd.append("plataforma", form.plataforma);
  fd.append("url_plataforma", form.url_plataforma);
  fd.append("start_date", form.start_date);
  fd.append("has_certificate", form.has_certificate ? "1" : "0");

  if (form.duration) fd.append("duration", String(form.duration));
  fd.append("coupon_code", form.coupon_code);
  if (form.price) fd.append("price", String(form.price));
  if (form.discount_percent)
    fd.append("discount_percent", String(form.discount_percent));
  if (form.max_students) fd.append("max_students", String(form.max_students));

  if (imageFile) {
    // No importa el nombre original, si pasó por la compresión es webp
    fd.append("image", imageFile, "course_cover.webp");
  } else if (form.image_url.trim()) {
    fd.append("image", form.image_url.trim()); // Si es URL, lo enviamos como string
  }

  return fd;
}

export const CursosLive = () => {
  const { mutate, isPending } = useCreateCourse();
  const [fieldErrors, setFieldErrors] = useState<Record<string, any>>({});

  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    image_url: "",
    plataforma: "",
    url_plataforma: "",
    start_date: "",
    duration: "",
    has_certificate: false,
    coupon_code: "",
    price: "",
    discount_percent: "",
    max_students: "",
  });
  const handleEditorChange = (htmlContent: string) => {
    setForm((prev) => ({ ...prev, description: htmlContent }));

    if (fieldErrors.description) {
      setFieldErrors((prev: any) => {
        const { description, ...rest } = prev;
        return rest;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };
  const generateRandomCoupon = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm((prev) => ({ ...prev, coupon_code: result }));
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecciona un archivo de imagen");
      return;
    }

    toast.loading("Comprimiendo imagen…", { id: "compress" });
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        fileType: "image/webp",
      });

      setImageFile(compressedFile);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(compressedFile);
      });
      setForm((prev) => ({ ...prev, image_url: "" }));
      toast.success("Imagen lista para enviar", { id: "compress" });
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    } catch (err) {
      console.error(err);
      toast.error("No se pudo procesar la imagen", { id: "compress" });
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const fd = buildCourseFormData(form, imageFile);

    mutate(fd, {
      onSuccess: () => {
        toast.success("Módulo de curso desplegado correctamente");
        clearImage();
        setForm({
          title: "",
          description: "",
          category: "",
          level: "",
          image_url: "",
          plataforma: "",
          url_plataforma: "",
          start_date: "",
          duration: "",
          has_certificate: false,
          coupon_code: "",
          price: "",
          discount_percent: "",
          max_students: "",
        });
      },
      onError: (err: any) => {
        if (err.data?.errors) {
          setFieldErrors(err.data.errors);
        } else {
          toast.error(err.message || "Error al crear el curso");
        }
      },
    });
  };

  const imageError = fieldErrors?.image;

  return (
    <div className="overflow-hidden relative">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <BookOpen size={200} />
      </div>

      <header className="mb-10 border-b border-zinc-900 pb-6">
        <h2 className="text-2xl font-light tracking-[0.3em]  uppercase">
          Nuevo <span className="text-red-500 font-bold">Curso en Vivo</span>
        </h2>
        <p className="text-[10px] text-zinc-600 font-mono tracking-widest mt-1">
          SISTEMA DE GESTIÓN DE CONTENIDO EDUCATIVO
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-[11px] font-mono text-red-500 tracking-widest flex items-center gap-2 italic">
              <FileText size={14} /> DETALLES DEL CURSO
            </h3>
            <Field
              label="Título del Curso"
              name="title"
              icon={BookOpen}
              value={form.title}
              onChange={handleChange}
              fieldErrors={fieldErrors}
              placeholder="Ej: Master en Tesis"
            />
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 ml-1 block font-bold group-focus-within:text-red-500 transition-colors">
              Descripción
            </label>
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-md">
              <ProEditor
                value={form.description}
                onChange={handleEditorChange}
              />
            </div>

            {fieldErrors.description && (
              <p className="text-red-500 text-[10px] uppercase font-mono mt-1">
                {fieldErrors.description[0]}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Categoría"
                name="category"
                icon={Layers}
                value={form.category}
                onChange={handleChange}
                fieldErrors={fieldErrors}
                placeholder="Desarrollo"
              />
              <Field
                label="Nivel"
                name="level"
                icon={Layers}
                value={form.level}
                onChange={handleChange}
                fieldErrors={fieldErrors}
                placeholder="Intermedio"
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-[11px] font-mono text-red-500 tracking-widest flex items-center gap-2 italic">
              <Globe size={14} /> CONFIGURACION DE PLATAFORMA
            </h3>

            <div className="w-full group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1 block font-bold group-focus-within:text-blue-500 transition-colors">
                PORTADA_DEL_CURSO
              </label>

              <div className="relative">
                {/* Input oculto pero funcional */}
                <input
                  id="course-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Área interactiva: Si hay preview muestra la imagen, si no, el placeholder */}
                <label
                  htmlFor="course-image"
                  className={`
        relative flex flex-col items-center justify-center w-full h-48 
        rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
        ${
          preview
            ? "border-red-500/50 bg-zinc-900/20"
            : "shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 hover:border-zinc-700 hover:bg-zinc-900/40"
        }
        ${imageError ? "border-red-600 bg-red-500/5" : ""}
      `}
                >
                  {preview ? (
                    <>
                      {/* Vista previa de la imagen comprimida */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                      />
                      {/* Overlay al hacer hover para indicar que se puede cambiar */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50">
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase bg-zinc-950/80 px-4 py-2 rounded-full border border-white/10">
                          Cambiar Imagen
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Estado vacío (Placeholder) */
                    <div className="flex flex-col items-center gap-3 text-zinc-600 group-hover:text-red-400 transition-colors">
                      <div className="p-4 rounded-full bg-zinc-900 border border-white/5">
                        <ImageIcon size={24} strokeWidth={1} />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-mono tracking-widest uppercase">
                          Subir archivo
                        </p>
                        <p className="text-[9px] text-zinc-700 mt-1 uppercase italic">
                          WebP / PNG / JPG (Max 1MB)
                        </p>
                      </div>
                    </div>
                  )}
                </label>

                {/* Botón de eliminar (Solo aparece si hay imagen) */}
                {preview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearImage();
                    }}
                    className="absolute font-bold -top-2 -right-2 p-1.5 shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50  text-zinc-500 hover:text-red-400 rounded-fulltransition-colors backdrop-blur-md"
                  >
                    X
                  </button>
                )}
              </div>

              {/* Error de validación */}
              {imageError && (
                <div className="flex items-center gap-1 mt-2 ml-1 text-red-500">
                  <AlertCircle size={12} />
                  <span className="text-[9px] font-mono uppercase tracking-tighter">
                    {imageError[0] || imageError}
                  </span>
                </div>
              )}
            </div>

            <Field
              label="Plataforma de Transmisión"
              name="plataforma"
              icon={Globe}
              value={form.plataforma}
              onChange={handleChange}
              fieldErrors={fieldErrors}
              placeholder="Zoom, Google Meet, etc."
            />
            <Field
              label="URL de la Reunión"
              name="url_plataforma"
              icon={LinkIcon}
              value={form.url_plataforma}
              onChange={handleChange}
              fieldErrors={fieldErrors}
              placeholder="https://meet.google.com/..."
            />

            <div className="flex items-center gap-3 p-4 shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 rounded-lg mt-2">
              <input
                type="checkbox"
                name="has_certificate"
                checked={form.has_certificate}
                onChange={handleChange}
                className="w-5 h-5 accent-red-600 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold ">
                  Emisión de Certificado
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-tighter">
                  Habilitar diploma al finalizar
                </span>
              </div>
              <Award
                className={`ml-auto ${form.has_certificate ? "text-red-500" : "text-zinc-700"}`}
                size={20}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Cupón de Descuento (8-12 caracteres)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-3 top-3 w-4 h-4 text-orange-400" />
                  <input
                    type="text"
                    name="coupon_code"
                    value={form.coupon_code}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        coupon_code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="CUPON2026"
                    className="p-2.5 pl-10 rounded-lg w-full shadow-black/50 shadow-md  font-mono uppercase focus:ring-2 focus:ring-red-500 outline-none"
                    maxLength={12}
                  />
                </div>
                <button
                  type="button"
                  onClick={generateRandomCoupon}
                  className="bg-red-700 px-3 rounded-lg hover:bg-red-600 border border-red-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full mb-2">
            <h3 className="text-[11px] font-mono text-red-500 tracking-widest italic">
              PRECIOS Y LOGÍSTICA
            </h3>
          </div>

          <Field
            label="Fecha de Inicio"
            name="start_date"
            type="datetime-local"
            icon={Calendar}
            value={form.start_date}
            onChange={handleChange}
            fieldErrors={fieldErrors}
          />
          <Field
            label="Duración (Horas)"
            name="duration"
            type="number"
            icon={Clock}
            value={form.duration}
            onChange={handleChange}
            fieldErrors={fieldErrors}
            placeholder="10"
          />
          <Field
            label="Cupos Máximos"
            name="max_students"
            type="number"
            icon={Users}
            value={form.max_students}
            onChange={handleChange}
            fieldErrors={fieldErrors}
            placeholder="50"
          />

          <Field
            label="Precio ($)"
            name="price"
            type="number"
            icon={DollarSign}
            value={form.price}
            onChange={handleChange}
            fieldErrors={fieldErrors}
            placeholder="99.99"
          />
          <Field
            label="Descuento (%)"
            name="discount_percent"
            type="number"
            icon={Percent}
            value={form.discount_percent}
            onChange={handleChange}
            fieldErrors={fieldErrors}
            placeholder="10"
          />

          {/* Card de Precio Final optimizada */}
          <div className="flex flex-col justify-end">
            <span className="text-[11px] uppercase tracking-widest text-blue-400 font-bold mb-1.5 ml-1">
              Precio Final Calculado
            </span>
            <div className="bg-blue-600 h-[46px] flex items-center justify-center rounded-lg border border-red-600/20 font-mono text-white text-xl shadow-lg shadow-blue-900/20">
              $
              {(
                Number(form.price) -
                Number(form.price) * (Number(form.discount_percent) / 100)
              ).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pt-6">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full max-w-md py-4 rounded-xl font-bold tracking-[0.4em] text-[11px] uppercase transition-all flex items-center justify-center gap-3 ${
              isPending
                ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] cursor-pointer active:scale-[0.98]"
            }`}
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <CheckCircle size={16} />
            )}
            {isPending ? "PROCESANDO..." : "PUBLICAR CURSO"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  fieldErrors,
  type = "text",
  placeholder,
  icon: Icon,
}: any) => {
  const hasError = fieldErrors?.[name];
  return (
    <div className="w-full group">
      <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 ml-1 block font-bold group-focus-within:text-red-500 transition-colors">
        {label}
      </label>
      <div className="relative w-full">
        {/* Icono posicionado correctamente de forma absoluta */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors pointer-events-none">
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          // Añadido w-full para que ocupe todo el espacio de la columna
          className={`w-full shadow-black/30 shadow-md bg-zinc-400/10 dark:bg-zinc-950/50 border dark:border-zinc-600/30 border-zinc-300/50 ${
            hasError ? "border-red-500" : ""
          } rounded-lg ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 outline-none transition-all focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 text-sm`}
        />
      </div>
      {hasError && (
        <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500">
          <AlertCircle size={12} />
          <span className="text-[9px] font-mono uppercase tracking-tighter">
            {hasError[0] || hasError}
          </span>
        </div>
      )}
    </div>
  );
};
