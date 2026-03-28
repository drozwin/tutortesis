import { useMutation } from "@tanstack/react-query";
import { createOrder, createOrderProduct, createOrderCourseLive } from "@/services/checkoutService";

export function useCheckout() {
  return useMutation({
    // Recibe un objeto con id y opcionalmente el cupón
    mutationFn: ({ courseId, couponCode }: { courseId: number; couponCode?: string }) => 
      createOrder(courseId, couponCode),
  });
}

export function useCheckoutProduct() {
  return useMutation({
    mutationFn: ({
      courseId,
      file,
      couponCode,
    }: {
      courseId: number;
      file: File;
      couponCode?: string;
    }) => createOrderProduct(courseId, file, couponCode),
  });
}

export function useCheckoutCourseLive() {
  return useMutation({
    mutationFn: ({
      courseId,
      file,
      couponCode,
    }: {
      courseId: number;
      file: File;
      couponCode?: string;
    }) => createOrderCourseLive(courseId, file, couponCode),
  });
}