// hooks/useCategories.ts

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useCategoryMutations() {
  const queryClient = useQueryClient();

  // 🟢 CREATE
  const create = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // 🟡 UPDATE
  const update = useMutation({
    mutationFn: ({ id, data }: any) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // 🔴 DELETE
  const remove = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    create,
    update,
    remove,
  };
}
