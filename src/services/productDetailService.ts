import { apiClient } from "@/lib/fetch"
import { ProductResponse } from "@/types/productDetail"

export function getProductDetail(id: string) {
  return apiClient<ProductResponse>(`/products/${id}`, {
    method: "GET",
  })
}