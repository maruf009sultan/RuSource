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
}

export interface Category {
  name: string;
  emoji: string;
  slug: string;
  tagline: string;
  resources: Resource[];
}

export const categories: Category[] = data as Category[];

export const allResources: (Resource & { category: string; categorySlug: string; categoryEmoji: string })[] =
  categories.flatMap((c) =>
    c.resources.map((r) => ({
      ...r,
      category: c.name,
      categorySlug: c.slug,
      categoryEmoji: c.emoji,
    }))
  );

export const totalResources = allResources.length;

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
