import data from "@/data/resources.json";

export type Pricing = "free" | "paid" | "freemium";
export type Level = string;

export interface Resource {
  title: string;
  url: string;
  description: string;
  level: Level;
  pricing: Pricing;
  types: string[];
  id?: string;
}

export interface Category {
  name: string;
  emoji: string;
  slug: string;
  tagline: string;
  resources: Resource[];
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0400-\u04FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "resource";
}

const rawCategories = data as Category[];

// ensure each resource has a stable id (per-category unique slug)
export const categories: Category[] = rawCategories.map((c) => {
  const seen = new Map<string, number>();
  return {
    ...c,
    resources: c.resources.map((r) => {
      const base = slugifyTitle(r.title);
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      const id = n === 1 ? base : `${base}-${n}`;
      return { ...r, id };
    }),
  };
});

export type EnrichedResource = Resource & {
  id: string;
  category: string;
  categorySlug: string;
  categoryEmoji: string;
};

export const allResources: EnrichedResource[] = categories.flatMap((c) =>
  c.resources.map((r) => ({
    ...r,
    id: r.id!,
    category: c.name,
    categorySlug: c.slug,
    categoryEmoji: c.emoji,
  }))
);

export const totalResources = allResources.length;

/** In-site shareable URL for a single resource (anchor-based deep link). */
export function resourceShareUrl(categorySlug: string, id: string): string {
  return `/category/${categorySlug}#${id}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "All"] as const;

export function levelMatches(resourceLevel: string, target: string): boolean {
  if (target === "All") return true;
  if (resourceLevel === target) return true;
  if (resourceLevel === "All" || resourceLevel === "All Levels") return true;
  // ranges like A1-A2, B1+
  if (resourceLevel.includes(target)) return true;
  if (resourceLevel.endsWith("+")) {
    const base = resourceLevel.slice(0, 2);
    const order = ["A1", "A2", "B1", "B2", "C1", "C2"];
    return order.indexOf(target) >= order.indexOf(base);
  }
  if (resourceLevel.includes("-")) {
    const [a, b] = resourceLevel.split("-").map((s) => s.trim());
    const order = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const ti = order.indexOf(target);
    return ti >= order.indexOf(a) && ti <= order.indexOf(b);
  }
  return false;
}
