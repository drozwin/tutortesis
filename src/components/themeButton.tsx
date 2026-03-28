"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full transition-colors duration-300 
      bg-sky-400 dark:bg-slate-800 flex items-center px-1"
    >
      <Moon
        className={`absolute left-1 w-5 h-5 transition-all duration-500
        ${isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"}`}
      />

      <Sun
        className={`absolute right-1 w-5 h-5 text-yellow-300 transition-all duration-500 animate-spin-slow
        ${!isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-45"}`}
      />

      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300
        ${isDark ? "translate-x-8" : "translate-x-0"}`}
      />
    </button>
  );
}
