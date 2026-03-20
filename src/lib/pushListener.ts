export function initPushSoundListener() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.playSound) {
        new Audio("/notification.mp3").play();
      }
    });
  }
}