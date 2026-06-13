import { useEffect, useState } from "react";

const KEY = "rusource:theme";
type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Theme | null);
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyTheme(next);
      return next;
    });
  };

  return { theme, toggle };
}

function applyTheme(t: Theme) {
  const html = document.documentElement;
  html.classList.toggle("dark", t === "dark");
  // Update theme-color meta to match the actual background
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "dark" ? "#1a1620" : "#f5f0e6");
}
