import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  getProducts,
  getProductDetail,
  createProduct,
  uploadToR2,
} from "@/services/productsService";
import { useEffect, useState } from "react";

export function useProducts(page: number) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,

    refetchOnMount: true,
    refetchOnReconnect: true,

    placeholderData: keepPreviousData,
    enabled: mounted, // evita ejecución en SSR
  });
}
export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["productdetail", id],
    queryFn: () => getProductDetail(id),

    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

//subir videos crear
export function useCreateProduct(onUploadProgress?: (p: number) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, files }: { formData: any; files: File[] }) => {
      // 1. Crear el registro en Laravel
      const response = await createProduct(formData);

      // 2. Subir a R2 si hay URL y archivo
      if (response.upload_url && files.length > 0) {
        const zipFile = files[0];
        await uploadToR2(response.upload_url, zipFile, (progress) => {
          if (onUploadProgress) onUploadProgress(progress);
        });
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
// export function useCreateProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       formData,
//       files,
//     }: {
//       formData: any;
//       files: File[];
//     }) => {
//       // 1. Crear registro en Laravel (enviando nombres de archivos para obtener URLs firmadas)
//       const fileNames = files.map((f) => f.name);
//       const response = await createProduct({
//         ...formData,
//         file_names: fileNames,
//       });

//       // 2. Si el backend devolvió URLs de subida (upload_urls), procedemos con R2
//       // ... dentro de mutationFn ...
//       // ... dentro de mutationFn ...
//       if (response.upload_urls && response.upload_urls.length > 0) {
//         console.log("Iniciando subida masiva a R2...");

//         const uploadPromises = response.upload_urls
//           .map((item: any) => {
//             const fileBinary = files.find(
//               (f) => (f.webkitRelativePath || f.name) === item.name,
//             );

//             // CORRECCIÓN: Laravel envió un objeto con {url, headers}
//             // Accedemos directamente a item.url
//             if (!fileBinary) return null;
//             // const targetUrl = item.url;

//             // if (fileBinary && targetUrl) {
//             //   return uploadToR2(targetUrl, fileBinary, (progress) => {
//             //     console.log(`Subiendo ${item.name}: ${progress}%`);
//             //   });
//             // }
//             return uploadToR2(item.url, fileBinary, (progress) => {
//               console.log(`Subiendo ${item.name}: ${progress}%`);
//             });
//             return null;
//           })
//           .filter(Boolean);

//         await Promise.all(uploadPromises);

//       }

//       return response;
//     },
//     onSuccess: () => {
//       // Refrescamos la lista de productos en el cache de React Query
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//       alert("Producto creado y archivos guardados en Cloudflare");
//     },
//     onError: (err: any) => {
//       // Manejo de errores detallado (por si falla Laravel o Cloudflare)
//       console.error("Error detallado:", err);
//       alert("Error en la subida: " + (err.data?.error || err.message));
//     },
//   });
// }
