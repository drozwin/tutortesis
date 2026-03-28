import { useState } from "react";

export const VoucherModal = ({ payment, isLoading, onClose }: any) => {
  const [zoom, setZoom] = useState(1);

  if (isLoading) return <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-white">Cargando...</div>;

  if (!payment) return null;
  console.log("payment:", payment);
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose} // 👈 cerrar al hacer click afuera
    >
      <div
        className="bg-white p-4 rounded-xl max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()} // 👈 evitar cerrar al hacer click dentro
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg mb-3">Comprobante</h2>

        {/* 🔥 IMAGEN */}
        <div className="overflow-auto max-h-[500px] flex justify-center">
          <img
            src={payment?.order?.items?.[0]?.voucher_url}
            style={{ transform: `scale(${zoom})` }}
            className="transition"
          />
        </div>

        {/* 🔥 CONTROLES */}
        <div className="flex gap-2 mt-4 justify-center">
          <button
            onClick={() => setZoom((z) => z + 0.2)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Zoom +
          </button>

          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Zoom -
          </button>

          {/* 🔥 DESCARGAR */}
          <a
            href={payment.voucher_url}
            download
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Descargar
          </a>
        </div>
      </div>
    </div>
  );
};