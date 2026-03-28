import { apiClient } from "@/lib/fetch";
import { PaginatedProducts, ProductResponse } from "@/types/productDetail";

// export function getProducts(page = 1) {
//   return apiClient<PaginatedProducts>(`/products?page=${page}`, {
//     method: "GET",
//   });
// }
export const getProducts = async (page: number) => {
  console.log("🔥 FETCHING PRODUCTS...");
  const res = await fetch(`/api/products?page=${page}`);
  return res.json();
};

export function getProductDetail(id: string) {
  return apiClient<ProductResponse>(`/products/${id}`, {
    method: "GET",
  });
}

// 1. Crear el producto y obtener URLs de subida
export async function createProduct(data: any) {
  // Log de debug
  console.log("Datos enviados al backend:", data);

  const response = await apiClient<any>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log("Respuesta backend:", response);
  return response;
}

export function uploadToR2(
  url: string,
  file: File,
  onProgress?: (p: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 1. Configurar el seguimiento de progreso
    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    // 2. Manejar el fin de la carga
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Error R2: ${xhr.status} ${xhr.statusText}`));
      }
    };

    // 3. Manejar errores
    xhr.onerror = () => reject(new Error("Error de red al subir a R2"));
    xhr.onabort = () => reject(new Error("Subida abortada"));

    // 4. Abrir y enviar
    xhr.open("PUT", url);
    // IMPORTANTE: El Content-Type debe ser el mismo que firmaste en Laravel
    xhr.setRequestHeader("Content-Type", file.type || "application/zip");

    xhr.send(file);
  });
}
