import { createContext, useContext, useState, useEffect, useCallback, createElement, type ReactNode } from "react";

const KEY = "rusource:recently-viewed";
const MAX_ITEMS = 12;

interface RecentlyViewedEntry {
  url: string;
  title: string;
  viewedAt: number; // timestamp
}

function read(): RecentlyViewedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(entries: RecentlyViewedEntry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // localStorage might be full - silently fail
  }
}

const RecentlyViewedContext = createContext<{
  items: RecentlyViewedEntry[];
  add: (url: string, title: string) => void;
  clear: () => void;
} | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentlyViewedEntry[]>([]);

  useEffect(() => {
    setItems(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((url: string, title: string) => {
    setItems((prev) => {
      // Remove if already exists, then add to front
      const filtered = prev.filter((e) => e.url !== url);
      const next = [{ url, title, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    write([]);
  }, []);

  return createElement(
    RecentlyViewedContext.Provider,
    { value: { items, add, clear } },
    children
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
