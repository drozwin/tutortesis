"use client";

import { useCheckout } from "@/hooks/useCheckout";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function EnrollButton({ courseId }: { courseId: number }) {
  const { mutate, isPending } = useCheckout();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  function handleEnroll() {

    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    mutate(courseId, {
      onSuccess: (data: any) => {

        if (data.approval_url) {
          window.location.assign(data.approval_url);
        }

      },
      onError: (error: any) => {
        console.error("Error backend:", error);
        alert("Error iniciando pago");
      },
    });
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={isPending}
      className="px-6 py-2 bg-red-600 text-white rounded"
    >
      {isPending ? "Procesando..." : "Inscribirme"}
    </button>
  );
}