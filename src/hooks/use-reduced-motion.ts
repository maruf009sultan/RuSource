import { useEffect, useState } from "react";

const KEY = "russify:reduce-motion";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const sysPref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initial = stored ? stored === "1" : sysPref;
    setReduced(initial);
    document.documentElement.classList.toggle("reduce-motion", initial);
  }, []);

  const toggle = () => {
    setReduced((r) => {
      const next = !r;
      localStorage.setItem(KEY, next ? "1" : "0");
      document.documentElement.classList.toggle("reduce-motion", next);
      return next;
    });
  };

  return { reduced, toggle };
}
