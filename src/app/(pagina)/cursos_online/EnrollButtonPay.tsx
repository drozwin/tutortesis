"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { useEnrollCourse, useCancelEnroll } from "@/hooks/useCourses";
import Link from "next/link";

export default function EnrollButtonPay({ course }: { course: any }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const enrollMutation = useEnrollCourse();
  const cancelMutation = useCancelEnroll();

  function handleEnroll() {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    enrollMutation.mutate(course.id);
  }

  function handleCancel() {
    cancelMutation.mutate(course.id);
  }

  if (course.is_enrolled) {
    return (
      <button
        onClick={handleCancel}
        className="px-6 py-2 cursor-pointer bg-red-600 text-white font-bold uppercase"
      >
        Cancelar Pay
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      className="px-6 py-2 cursor-pointer bg-green-600 text-white font-bold uppercase"
    >
      Inscribirme Pay
    </button>
  );
}
