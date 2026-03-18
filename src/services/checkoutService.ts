import { apiClient } from "@/lib/fetch";

export async function createOrder(courseId: number) {
  return apiClient(`/checkout/order/${courseId}`, {
    method: "POST",
  });
}