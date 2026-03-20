import { apiClient } from "@/lib/fetch";
import { PaginatedProducts, ProductResponse } from "@/types/productDetail";

export function getProducts(page = 1) {
  return apiClient<PaginatedProducts>(`/products?page=${page}`, {
    method: "GET",
  });
}

export function getProductDetail(id: string) {
  return apiClient<ProductResponse>(`/products/${id}`, {
    method: "GET",
  });
}

// 1. Crear el producto y obtener URLs de subida
export function createProduct(data: any) {
  return apiClient<any>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 2. Función para subir archivos directamente a R2 (Sin apiClient porque es otra URL)
export function uploadToR2(url: any, file: File, onProgress?: (p: number) => void): Promise<void> {
  // Si por alguna razón llega el objeto, extraemos la url aquí también como seguridad
  const finalUrl = typeof url === 'object' ? url.url : url;

  if (!finalUrl || typeof finalUrl !== 'string' || !finalUrl.startsWith('http')) {
    console.error("❌ URL inválida detectada:", finalUrl);
    return Promise.reject(new Error("La URL de subida no es válida"));
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        // Si sale "Fallo en R2", revisa el panel de red (Network) para ver el código (403, 405, etc)
        reject(new Error(`Fallo en R2 con estado: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Error de red"));

    xhr.open("PUT", finalUrl); // Ahora finalUrl es el string de Cloudflare
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(file);
  });
}