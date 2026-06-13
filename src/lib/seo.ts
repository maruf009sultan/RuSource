/**
 * Centralized SEO / URL helpers for RuSource.
 * All canonical / og:url values MUST go through absUrl() so they are
 * always fully-qualified with the correct origin.
 */

/** Production origin — resolved at build time via Vite's import.meta.env.
 *  Set SITE_ORIGIN in your .env or env vars for dev/staging (e.g. SITE_ORIGIN=http://localhost:5173)
 *  to make canonical URLs, og:urls, sitemap URLs, and JSON-LD point to the right origin.
 *  If omitted, defaults to the live production URL. */
export const SITE_ORIGIN: string =
  import.meta.env.SITE_ORIGIN || "https://rusource.org";

/** Convert a relative path to an absolute URL using the configured origin. */
export function absUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Google Site Verification - already verified via DNS TXT record.
 * Kept here as a constant in case we ever need it as a meta tag.
 */
export const GOOGLE_SITE_VERIFICATION = "dns-verified";

/** Google Tag Manager container ID. */
export const GTM_ID = "GTM-TFRFRL8Q";
