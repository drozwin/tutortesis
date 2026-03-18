import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/checkoutService";

export function useCheckout() {
  return useMutation({
    mutationFn: createOrder,
  });
}