import { apiClient } from "@/lib/fetch";
import { CartResponse } from "@/types/cart";

export function addCartItem(data: {
  product_id: number;
  quantity: number;
}) {
  return apiClient("/cart/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getCart() {
  return apiClient<CartResponse>("/cart/show", {
    method: "GET",
  });
}

export function deleteCartItem(id: number) {
  return apiClient(`/cart/delete/${id}`, {
    method: "DELETE",
  });
}
