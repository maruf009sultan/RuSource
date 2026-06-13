import { allResources } from "./resources";
import { absUrl } from "./seo";

/** Deterministic resource of the day (UTC). Same for every visitor on a given date. */
export function getResourceOfTheDay(date = new Date()) {
  const d = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayIndex = Math.floor(d / 86400000);
  // Mulberry32-ish hash
  let h = dayIndex >>> 0;
  h = Math.imul(h ^ (h >>> 15), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h = (h ^ (h >>> 16)) >>> 0;
  const idx = h % allResources.length;
  return { resource: allResources[idx], date };
}

export function getRandomResource() {
  return allResources[Math.floor(Math.random() * allResources.length)];
}

/** Build a fully-qualified URL for share/copy - uses centralized absUrl from seo.ts. */
export { absUrl as absoluteUrl };
