// ================== MEMORIA ==================
let cachedAccessToken: string | null = null;
let cachedRefreshToken: string | null = null;

// ================== COOKIES ==================
function cookieSet(name: string, value: string, days = 7) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    const expires = "expires=" + d.toUTCString();
    // Importante mantener el mismo Path y SameSite para poder sobreescribir/borrar
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax; Secure`;
  } catch {}
}

function cookieGet(name: string) {
  try {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  } catch { return null; }
}

// ================== CACHE (CacheStorage) ==================
async function cacheSet(key: string, value: string) {
  if (typeof window === "undefined" || !("caches" in window)) return;
  try {
    const cache = await caches.open("auth-token-cache");
    const body = JSON.stringify({ value, t: Date.now() });
    await cache.put(`/auth-token-cache/${key}`, new Response(body, {
      headers: { "Content-Type": "application/json" },
    }));
  } catch {}
}

async function cacheGet(key: string) {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  try {
    const cache = await caches.open("auth-token-cache");
    const res = await cache.match(`/auth-token-cache/${key}`);
    if (!res) return null;
    const json = await res.json();
    return json?.value ?? null;
  } catch { return null; }
}

// ================== LÓGICA DE PERSISTENCIA MAESTRA ==================

export async function persistAuthToken(token: string, KEY = "ss_a") {
  if (!token) return null;
  cachedAccessToken = token;
  
  // Guardamos en todas las capas
  localStorage.setItem(KEY, token);
  cookieSet(KEY, token);
  await cacheSet(KEY, token);
  
  return token;
}

export async function getAuthToken(KEY = "ss_a") {
  // 1. Intentamos obtener el token de cualquier fuente disponible
  const locStorage = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
  const cookie = cookieGet(KEY);
  const cacheSt = await cacheGet(KEY);

  const activeToken = cachedAccessToken || locStorage || cookie || cacheSt;

  if (!activeToken) return null;

  // 2. AUTO-SANACIÓN: Si falta en alguna fuente física, lo restauramos de inmediato
  if (!locStorage || !cookie || !cacheSt || cachedAccessToken !== activeToken) {
    console.log(`[Auth] Sincronizando ${KEY}...`);
    await persistAuthToken(activeToken, KEY);
  }

  return activeToken;
}

// ================== REFRESH TOKEN ==================

export async function persistRefreshToken(token: string, KEY = "rf") {
  if (!token) return null;
  cachedRefreshToken = token;

  localStorage.setItem(KEY, token);
  cookieSet(KEY, token);
  await cacheSet(KEY, token);

  return token;
}

export async function getRefreshToken(KEY = "rf") {
  const locStorage = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
  const cookie = cookieGet(KEY);
  const cacheSt = await cacheGet(KEY);

  const activeToken = cachedRefreshToken || locStorage || cookie || cacheSt;

  if (!activeToken) return null;

  // Restaurar si alguien borró algo
  if (!locStorage || !cookie || !cacheSt || cachedRefreshToken !== activeToken) {
    await persistRefreshToken(activeToken, KEY);
  }

  return activeToken;
}

// ================== CLEAR ==================
export async function clearAuthTokens() {
  cachedAccessToken = null;
  cachedRefreshToken = null;

  try {
    localStorage.removeItem("ss_a");
    localStorage.removeItem("rf");
    
    // Al borrar, usar los mismos atributos que al crear
    document.cookie = "ss_a=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure";
    document.cookie = "rf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure";
    
    if (typeof window !== "undefined" && "caches" in window) {
      await caches.delete("auth-token-cache");
    }
  } catch {}
}