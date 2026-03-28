"use client";
import React, { useState } from "react";
import { QrCode, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckoutCourseLive } from "@/hooks/useCheckout";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | number;
  productTitle: string;
  paypalLink: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  productId,
  productTitle,
  paypalLink,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync, isPending } = useCheckoutCourseLive();

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un comprobante primero");

    try {
      await mutateAsync({
        courseId: Number(productId),
        file,
        couponCode: undefined, // luego puedes agregar input
      });

      alert("✅ Comprobante enviado correctamente");
      setFile(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al enviar comprobante");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-xl p-8 w-[400px] relative shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{productTitle}</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Escanea el QR para pagar (solo Bolivia) o usa el link de PayPal:
            </p>

            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                <QrCode size={48} /> {/* Aquí podrías renderizar un QR real */}
              </div>
              <a
                href={paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Pago manual con PayPal
              </a>
              <p className="text-sm text-zinc-400 mb-4">
                NOTA: Una vez realizada el pago por QR o por el link de
                (PayPayl) suba el comprobante, Una vez verificada el comprobante
                podra ser habilitado de inmediato para ver el curso adquirido.
                Gracias!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex flex-col items-center gap-2 cursor-pointer bg-slate-200 dark:bg-zinc-800 p-2 rounded-lg text-sm">
                <Upload /> Selecciona comprobante
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file && <span className="text-xs">{file.name}</span>}
              </label>

              <button
                onClick={handleUpload}
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold mt-2 disabled:opacity-50"
              >
                {isPending ? "Enviando..." : "Enviar comprobante"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { PaymentModal as ProductDetailPageWithPayment };
export default PaymentModal;
