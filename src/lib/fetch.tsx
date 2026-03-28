const API_URL = process.env.NEXT_PUBLIC_API_URL;

function buildHeaders(
  extra?: HeadersInit,
  body?: BodyInit | null,
): Record<string, string> {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420",
  };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (extra && typeof Headers !== "undefined") {
    const h = new Headers(extra);
    h.forEach((v, k) => {
      headers[k] = v;
    });
  }
  return headers;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & { skipRefresh?: boolean },
): Promise<T> {
  const { skipRefresh, ...init } = options ?? {};
  const headers = buildHeaders(init.headers, init.body ?? null);
  const isFormData =
    typeof FormData !== "undefined" && init.body instanceof FormData;
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...init,
    headers,
    body: isFormData ? init.body : init.body,
    credentials: "include",
  });

  // 🔥 SOLO refrescar si NO se desactiva
  if (res.status === 401 && !skipRefresh) {
    const refreshRes = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // 🔁 retry original
      const retry = await fetch(`${API_URL}${endpoint}`, {
        ...init,
        headers,
        body: isFormData ? init.body : init.body,
        credentials: "include",
      });

      let retryData: any = null;
      try {
        retryData = await retry.json();
      } catch (err) {
        console.error("❌ Retry JSON error:", err);
      }

      if (!retry.ok) {
        const errorFormatted: any = new Error(
          retryData?.message || "Error en retry",
        );
        errorFormatted.status = retry.status;
        errorFormatted.data = retryData;
        throw errorFormatted;
      }

      return retryData;
    }

    throw new Error("Sesión expirada");
  }

  // 🔽 tu lógica original (igual)
  let data: any = null;
  try {
    data = await res.json();
  } catch (err) {
    console.error("❌ No se pudo parsear JSON:", err);
  }

  if (!res.ok) {
    const errorFormatted: any = new Error(
      data?.message || "Error en la petición",
    );

    errorFormatted.status = res.status;
    errorFormatted.data = data;

    throw errorFormatted;
  }

  return data;
}
