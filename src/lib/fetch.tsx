import { getPersistentId } from "../persist/persistentId";
import { getAuthToken } from "../persist/AuthPersistence";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    "x-web-id": webId ?? "?", // fallback si webId es null
    'ngrok-skip-browser-warning': '69420', //obligatorio si es ngrock
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
    // Retornamos los datos del backend aunque sea error
    throw { status: res.status, data };
  }

  return data;
}
