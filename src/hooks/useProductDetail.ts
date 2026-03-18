import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/services/productDetailService";

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["productdetail", id],
    queryFn: () => getProductDetail(id),

    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}