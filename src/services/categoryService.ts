// services/categoryService.ts

import { apiClient } from "@/lib/fetch";

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: "digital" | "physical" | "both";
  description?: string;
  icon?: string;
  is_active: boolean;
}

// 🔵 GET
export const getCategories = async (): Promise<Category[]> => {
  return apiClient<Category[]>("/categories");
};

// 🟢 POST
export const createCategory = async (data: Partial<Category>) => {
  return apiClient("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// 🟡 PUT
export const updateCategory = async (id: number, data: Partial<Category>) => {
  return apiClient(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// 🔴 DELETE
export const deleteCategory = async (id: number) => {
  return apiClient(`/categories/${id}`, {
    method: "DELETE",
  });
};