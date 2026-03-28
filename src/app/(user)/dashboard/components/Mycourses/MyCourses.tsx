"use client";
const MI_WEB_COM = process.env.NEXT_PUBLIC_URL;
import { useMyCourses } from "@/hooks/useMyCourses";
import HlsVideoPlayer from "./reproductor";
interface CourseDescriptionProps {
  htmlContent: string;
}
export const CourseDescription = ({ htmlContent }: CourseDescriptionProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 rounded-3xl">
      {/* RENDERIZADO DEL HTML COMPLETO */}
      <article
        className=" leading-relaxed 
          [&>h1]:text-3xl [&>h1]:font-bold  [&>h1]:mb-6 [&>h1]:mt-8
          [&>h2]:text-xl [&>h2]:font-semibold  [&>h2]:mb-4 [&>h2]:mt-6
          [&>p]:mb-4 [&>p]:text-sm md:[&>p]:text-base
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul]:space-y-2
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>ol]:space-y-2
          [&>blockquote]:border-l-4  [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
           [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-xs
          [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:my-6 [&>pre]:overflow-x-auto
          [&>img]:rounded-2xl [&>img]:border"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};
export const MyCourses = () => {
  const { data, loading, error } = useMyCourses();

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="cardBG rounded-2xl overflow-hidden border border-zinc-700/30 shadow-md"
        >
          {/* 🔥 IMAGEN */}
          <img
            src={
              item.image ? `${MI_WEB_COM}/${item.image}` : "/placeholder.jpg"
            }
            className="w-full h-40 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg text-white font-bold">{item.title}</h3>

            {/* 🔥 DESCRIPCIÓN */}
            <div
              className="text-sm text-zinc-400 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />

            {/* 🔥 ESTADO */}
            <span
              className={`text-xs font-bold ${
                item.access === "granted" ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {item.access === "granted"
                ? "Acceso habilitado"
                : "Pendiente de pago"}
            </span>

            {/* ================================= */}
            {/* 🔥 COURSE */}
            {/* ================================= */}
            {item.type === "course" && (
              <>
                <span className="text-xs text-zinc-500">
                  Nivel: {item.level}
                </span>

                <div className="flex flex-col gap-2 mt-2">
                  {item.access === "granted" && (
                    <a
                      href={item.url_plataforma}
                      target="_blank"
                      className="bg-blue-600 text-white text-center py-2 rounded-lg"
                    >
                      Entrar al curso
                    </a>
                  )}

                  {item.has_certificate && item.access === "granted" && (
                    <button
                      onClick={() => downloadCertificate(item.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Descargar certificado
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ================================= */}
            {/* 🔥 PRODUCT */}
            {/* ================================= */}
            {item.type === "product" && (
              <div className="flex flex-col gap-3 mt-2">
                {/* 📦 DESCARGA */}
                {item.file_url && item.access === "granted" && (
                  <a
                    href={item.file_url}
                    className="bg-purple-600 text-white text-center py-2 rounded-lg"
                  >
                    Descargar material
                  </a>
                )}

                {/* 🎥 VIDEO HLS */}
                {/* {item.video_url && item.access === "granted" && (
                  <div className="mt-2">
                    <HlsVideoPlayer src={`http://localhost:8000/api/video/${item.video_private_path}`}/>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const downloadCertificate = async (orderItemId: number) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/certificates/${orderItemId}/download`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Error al descargar");
    }

    const blob = await res.blob(); // 👈 CLAVE
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "certificado.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("No se pudo descargar el certificado");
  }
};
