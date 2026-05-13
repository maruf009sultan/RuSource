# Russify

The most comprehensive curated directory of free & paid resources for learning the Russian language. From the Cyrillic alphabet to C2 mastery.

Built on the open-source dataset [`awesome-russian-language`](https://github.com/maruf009sultan/awesome-russian-language) by [@maruf009sultan](https://github.com/maruf009sultan).

## Features

- 700+ hand-picked resources across 30+ categories
- CEFR-aligned roadmap (A1 → C2) with goals, daily routines, and pitfalls
- Browse with fuzzy search, level/pricing/category filters
- Resource of the day (deterministic — same for every visitor each UTC day)
- Random resource button for serendipitous discovery
- Favorites stored locally in your browser
- Share & copy any URL — works on any domain you deploy to
- Dark mode + reduce-motion toggle for accessible browsing
- SEO-ready: per-page meta, JSON-LD, sitemap.xml, robots.txt, canonical tags
- Fast, edge-rendered on Cloudflare Workers

## Deploy to Cloudflare Workers — 1 click

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/maruf009sultan/awesome-russian-language)

> Replace the `url=` query above with your own GitHub fork URL after forking. The button reads `wrangler.jsonc` from the repo and walks you through deploy in the Cloudflare dashboard — no CLI needed.

### Manual deploy (if you prefer)

```bash
bun install
bunx wrangler deploy
```

That's it. The `wrangler.jsonc` already targets the Workers runtime with `nodejs_compat`. Add a custom domain in the Cloudflare dashboard under **Workers & Pages → your worker → Settings → Domains**.

## Local development

```bash
bun install
bun dev
```

Then open http://localhost:5173.

## Credits

- Data: [@maruf009sultan](https://github.com/maruf009sultan) — original curator of the dataset
- UI & site: built with TanStack Start, React, Tailwind CSS, shadcn/ui, Framer Motion
- Hosted on Cloudflare Workers

## License

The Russian-learning dataset is CC0 (public domain) via the upstream repo. The site code is MIT.
