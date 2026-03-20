// /lib/audio.ts
let audioRef: HTMLAudioElement | null = null;
let isUnlocked = false;

export function initAudio() {
  if (typeof window === "undefined" || audioRef) return;

  audioRef = new Audio("/sounds/notification.mp3");
  audioRef.preload = "auto";

  const unlock = () => {
    if (!audioRef || isUnlocked) return;

    // Intentamos un play silencioso. 
    // Si falla, no lo logueamos como error, simplemente esperamos al siguiente clic.
    audioRef.play()
      .then(() => {
        audioRef!.pause();
        audioRef!.currentTime = 0;
        isUnlocked = true;
        
        // Limpiamos eventos silenciosamente
        ["click", "mousedown", "keydown", "touchstart"].forEach(e => 
          window.removeEventListener(e, unlock)
        );
      })
      .catch(() => {
        // Falló porque no hubo interacción real aún. 
        // No ponemos nada en consola para no molestar.
      });
  };

  ["click", "mousedown", "keydown", "touchstart"].forEach(e => 
    window.addEventListener(e, unlock)
  );
}

export function playAudio() {
  // Solo intentamos sonar si ya está desbloqueado
  if (isUnlocked && audioRef) {
    audioRef.currentTime = 0;
    audioRef.play().catch(() => {
      // Si por un milagro falla, fallamos en silencio.
    });
  }
}