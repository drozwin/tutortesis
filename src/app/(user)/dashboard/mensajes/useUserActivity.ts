import { useState, useEffect, useRef } from "react";

export default function useUserActivity(timeoutMs = 15000) {
  const [isUserActive, setIsUserActive] = useState(true);
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setIsUserActive(true);
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(
        () => setIsUserActive(false),
        timeoutMs
      );
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
    };
  }, [timeoutMs]);

  return isUserActive;
}
