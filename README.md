# RuSource Updated

A fully rebranded, SEO-audited, performance-optimized fork of the [awesome-russian-language](https://github.com/maruf009sultan/awesome-russian-language) interactive directory.

Built on the open-source dataset curated by [@maruf009sultan](https://github.com/maruf009sultan).

## What this fork adds

- **Full SEO audit**: Per-page meta tags, canonical URLs, JSON-LD (BreadcrumbList, Course, LearningResource, FAQPage, CollectionPage, DefinedTermSet), sitemap.xml, robots.txt
- **Centralized URL strategy**: All URLs go through `absUrl()` in `src/lib/seo.ts` - canonical, og:url, JSON-LD, and share links always use the same origin. `SITE_ORIGIN` env var for dev/staging.
- **CSP with hash-based script allowlisting**: No `unsafe-inline` for scripts - GTM inline snippet is hash-allowed via `sha256-...` in CSP. Style-src `unsafe-inline` retained for Tailwind (build-time styles).
- **Self-hosted fonts**: No external Google Fonts `@import` - all font files served from `/fonts/` for faster FCP/LCP.
- **LRU cache**: `lru-cache` used for category lookup optimization.
- **Breadcrumb JSON-LD on every page**: Home > Section > Page pattern across all routes.
- **Per-resource structured data**: Category pages include `LearningResource` schema for each resource.
- **Browse page reads `?q=` query parameter**: Google sitelinks search box now sends users to a working search URL.
- **Custom 404 & 500 error pages**: Branded error pages matching site design.
- **Proper favicon set**: SVG favicon, ICO fallback, Apple touch icon, mask-icon for Safari.
- **Branded OG image**: `og-image.svg` with 1200×630 layout, no more GitHub avatar.
- **Security headers**: X-XSS-Protection: 0 (not 1;mode=block), X-Frame-Options: DENY, frame-ancestors: 'none', CSP with no unsafe-inline for scripts.
- **Resource types populated**: All 749 resources now have meaningful `types` arrays (previously 519 were empty).

## Deploy to Cloudflare Workers - 1 click

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/maruf009sultan/awesome-russian-language)

> Replace the `url=` query above with your own GitHub fork URL after forking.

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SITE_ORIGIN` | `https://rusource.org` | Canonical origin for all URLs. Set to `http://localhost:5173` in dev. |

### Manual deploy

```bash
npm install
npx wrangler deploy
```

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Tech stack

- **Framework**: TanStack Start (SSR) + React 19
- **Styling**: Tailwind CSS 4 + custom oklch color system
- **UI**: shadcn/ui (new-york variant)
- **Animation**: Framer Motion
- **Search**: Fuse.js (client-side fuzzy search)
- **Caching**: lru-cache
- **Deployment**: Cloudflare Workers (Nitro)
- **Fonts**: Self-hosted Unbounded, Inter, JetBrains Mono

## Credits

- **Data**: [@maruf009sultan](https://github.com/maruf009sultan) - original curator of the dataset
- **UI & site**: built with TanStack Start, React, Tailwind CSS, shadcn/ui, Framer Motion
- **Hosted on**: Cloudflare Workers

## License

The Russian-learning dataset is CC0 (public domain) via the upstream repo. The site code is MIT.
