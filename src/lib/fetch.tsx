import { getPersistentId } from "../persist/persistentId";
import { getAuthToken } from "../persist/AuthPersistence";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "https://katina-beadflush-unacquisitively.ngrok-free.dev/api"
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // obtener token y webId dentro de la función
  const auth = await getAuthToken();
  const webId = await getPersistentId();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-web-id": webId ?? "?",
    "ngrok-skip-browser-warning": "69420",
  };

  if (auth) {
    headers["Authorization"] = `Bearer ${auth}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers,
    ...options,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch (err) {
    console.error("❌ No se pudo parsear JSON:", err);
  }

  if (!res.ok) {
    const errorFormatted = new Error(data?.message || "Error en la petición");
    // @ts-ignore - Agregamos info extra al objeto Error
    errorFormatted.status = res.status;
    // @ts-ignore
    errorFormatted.data = data;
    throw errorFormatted;
  }

  return data;
}
