import { createContext, useContext, useState, useEffect, useCallback, createElement, type ReactNode } from "react";

const KEY = "rusource:favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

const FavoritesContext = createContext<{
  favorites: string[];
  toggle: (url: string) => void;
  isFav: (url: string) => boolean;
} | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavorites(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((url: string) => {
    setFavorites((prev) => {
      const next = prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFav = useCallback((url: string) => favorites.includes(url), [favorites]);

  return createElement(
    FavoritesContext.Provider,
    { value: { favorites, toggle, isFav } },
    children
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
