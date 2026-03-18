import { apiClient } from "@/lib/fetch"
import { PaginatedProducts } from "@/types/productDetail"

export function getProducts(page = 1) {
  return apiClient<PaginatedProducts>(`/products?page=${page}`, {
    method: "GET",
  })
}