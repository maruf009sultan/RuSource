import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories, allResources } from "@/lib/resources";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString();
        const recent = allResources.slice(0, 50);

        const entries = recent.map((r) => {
          const shareUrl = `${SITE_ORIGIN}/category/${r.categorySlug}#${r.id}`;
          return `    <entry>
      <title>${esc(r.title)}</title>
      <link href="${shareUrl}" rel="alternate" type="text/html"/>
      <id>${shareUrl}</id>
      <updated>${now}</updated>
      <summary>${esc(r.description)}</summary>
      <category term="${esc(r.category)}"/>
      <link href="${SITE_ORIGIN}/category/${r.categorySlug}" rel="via" title="${esc(r.category)}"/>
    </entry>`;
        }).join("\n");

        const categoryEntries = categories.slice(0, 20).map((c) => `    <entry>
      <title>${esc(c.emoji)} ${esc(c.name)} - ${c.resources.length} Russian Resources</title>
      <link href="${SITE_ORIGIN}/category/${c.slug}" rel="alternate" type="text/html"/>
      <id>${SITE_ORIGIN}/category/${c.slug}</id>
      <updated>${now}</updated>
      <summary>${esc(c.tagline)}</summary>
      <category term="${esc(c.name)}"/>
    </entry>`).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>RuSource - New Russian Learning Resources</title>
  <subtitle>The latest curated resources for learning Russian - podcasts, courses, apps, books, and tools for A1 to C2.</subtitle>
  <link href="${SITE_ORIGIN}/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_ORIGIN}" rel="alternate" type="text/html"/>
  <id>${SITE_ORIGIN}/feed.xml</id>
  <updated>${now}</updated>
  <author>
    <name>Maruf Sultan</name>
    <uri>https://github.com/maruf009sultan</uri>
  </author>
  <rights>CC0 - Public Domain</rights>
${entries}
${categoryEntries}
</feed>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/atom+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
