import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "@/lib/resources";
import { SITE_ORIGIN } from "@/lib/seo";

const TODAY = new Date().toISOString().split("T")[0];

const STATIC: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/browse", priority: "0.8", changefreq: "weekly" },
  { path: "/categories", priority: "0.8", changefreq: "monthly" },
  { path: "/roadmap", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/maruf", priority: "0.6", changefreq: "monthly" },
  { path: "/credits", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/glossary", priority: "0.6", changefreq: "monthly" },
  { path: "/daily", priority: "0.7", changefreq: "daily" },
  { path: "/favorites", priority: "0.5", changefreq: "always" },
  { path: "/feed.xml", priority: "0.6", changefreq: "weekly" },
];
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const TOPICS = ["free", "podcasts", "apps", "beginners", "grammar", "online"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [];
        const push = (path: string, priority = "0.7", changefreq = "weekly") => {
          urls.push(`  <url><loc>${SITE_ORIGIN}${path}</loc><lastmod>${TODAY}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
        };
        STATIC.forEach((s) => push(s.path, s.priority, s.changefreq));
        LEVELS.forEach((l) => push(`/levels/${l}`, "0.9", "weekly"));
        TOPICS.forEach((t) => push(`/learn/${t}`, "0.9", "weekly"));
        categories.forEach((c) => push(`/category/${c.slug}`, "0.8", "weekly"));

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
