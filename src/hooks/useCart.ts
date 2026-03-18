import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, deleteCartItem, addCartItem } from "@/services/cartService";
import { CartResponse } from "@/types/cart";

export function useAddCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,

    onSuccess: () => {
      // refresca carrito del header
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCart() {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
