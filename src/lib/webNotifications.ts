import { apiClient } from "./fetch";

// 🔥 REGISTER SW
export async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined") return null;

  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registrado");
      return reg;
    } catch (error) {
      console.error("❌ Error registrando SW:", error);
      return null;
    }
  }

  return null;
}

// 🔥 FUNCIÓN CORRECTA (SOLO UNA)
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  if (!base64String) {
    throw new Error("❌ VAPID KEY vacía");
  }

  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray.buffer;
}

// 🔥 SUBSCRIBE USER
export async function subscribeUser(): Promise<void> {
  if (typeof window === "undefined") return;

  if (!("serviceWorker" in navigator)) {
    console.warn("❌ Service Worker no soportado");
    return;
  }

  const reg = await navigator.serviceWorker.ready;

  const existing = await reg.pushManager.getSubscription();

  if (existing) {
    console.log("✅ Ya está suscrito");
    return;
  }

  const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;

  if (!vapidKey) {
    console.error("❌ No hay VAPID KEY");
    return;
  }

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey), // 🔥 CLAVE
  });

  console.log("📡 Usuario suscrito:", subscription);

  await apiClient("/save-subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
  });
}

// 🔊 SONIDO
export function initPushSoundListener() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.playSound) {
        new Audio("/sounds/notification.mp3").play();
      }
    });
  }
}