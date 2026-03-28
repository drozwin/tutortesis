import { apiClient } from "@/lib/fetch";

export async function createOrder(courseId: number, couponCode?: string) {
  return apiClient(`/checkout/order/${courseId}`, {
    method: "POST",
    body: JSON.stringify({ coupon_code: couponCode }), // Enviamos el cupón al backend
  });
}

export async function createOrderProduct(
  courseId: number,
  file: File,
  couponCode?: string,
) {
  const formData = new FormData();

  formData.append("voucher", file);

  if (couponCode) {
    formData.append("coupon_code", couponCode);
  }

  return apiClient(`/buy/product/${courseId}`, {
    method: "POST",
    body: formData,
  });
}
export async function createOrderCourseLive(
  courseId: number,
  file: File,
  couponCode?: string,
) {
  const formData = new FormData();

  formData.append("voucher", file);

  if (couponCode) {
    formData.append("coupon_code", couponCode);
  }

  return apiClient(`/buy/course/${courseId}`, {
    method: "POST",
    body: formData,
  });
}
