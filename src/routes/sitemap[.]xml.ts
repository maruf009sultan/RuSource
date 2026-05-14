import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "@/lib/resources";

const STATIC = ["/", "/browse", "/categories", "/roadmap", "/about", "/maruf", "/credits", "/faq", "/glossary", "/daily", "/favorites"];
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const TOPICS = ["free", "podcasts", "apps", "beginners", "grammar", "online"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls: string[] = [];
        const push = (path: string, priority = "0.7", changefreq = "weekly") => {
          urls.push(`  <url><loc>${origin}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
        };
        STATIC.forEach((p) => push(p, p === "/" ? "1.0" : "0.8"));
        LEVELS.forEach((l) => push(`/levels/${l}`, "0.9"));
        TOPICS.forEach((t) => push(`/learn/${t}`, "0.9"));
        categories.forEach((c) => push(`/category/${c.slug}`, "0.8"));

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
