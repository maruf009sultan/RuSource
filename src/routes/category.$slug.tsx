import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { getCategory, LEVELS, levelMatches, categories } from "@/lib/resources";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }): import("@/lib/resources").Category => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — ${loaderData.resources.length} Russian Resources | Russify` },
      { name: "description", content: loaderData.tagline || `${loaderData.resources.length} curated Russian learning resources for ${loaderData.name}.` },
      { property: "og:title", content: `${loaderData.emoji} ${loaderData.name} — Russify` },
      { property: "og:description", content: loaderData.tagline || `${loaderData.resources.length} resources for ${loaderData.name}` },
      { property: "og:url", content: `/category/${params.slug}` },
      { property: "og:type", content: "article" },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/category/${params.slug}` }] : [],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${loaderData.name} — Russian learning resources`,
        description: loaderData.tagline,
        url: `/category/${params.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: loaderData.resources.length,
          itemListElement: loaderData.resources.slice(0, 50).map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: r.url,
            name: r.title,
          })),
        },
      }),
    }] : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-black">Category not found</h1>
      <Link to="/categories" className="mt-6 inline-block text-signal hover:underline">← All categories</Link>
    </div>
  ),
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = getCategory(slug)!;
  const [level, setLevel] = useState<string>("All");
  const filtered = useMemo(
    () => (level === "All" ? cat.resources : cat.resources.filter((r) => levelMatches(r.level, level))),
    [cat, level]
  );

  const idx = categories.findIndex((c) => c.slug === cat.slug);
  const prev = categories[(idx - 1 + categories.length) % categories.length];
  const next = categories[(idx + 1) % categories.length];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/categories" className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-signal">
        <ArrowLeft className="h-3 w-3" /> All categories
      </Link>

      <div className="mt-6 flex items-start gap-3 sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-signal text-3xl brutal-shadow-sm sm:h-24 sm:w-24 sm:text-5xl sm:brutal-shadow">
          {cat.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-signal sm:text-xs">
            § Category {String(idx + 1).padStart(2, "0")} / {categories.length}
          </div>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-5xl">{cat.name}</h1>
          {cat.tagline && <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{cat.tagline}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {cat.resources.length} resources
            </div>
            <ShareButton
              url={`/category/${cat.slug}`}
              title={`${cat.emoji} ${cat.name} — Russify`}
              text={cat.tagline || `${cat.resources.length} curated Russian resources for ${cat.name}`}
              variant="pill"
            />
          </div>
        </div>
      </div>

      {/* Level filter */}
      <div className="mt-8 -mx-1 flex flex-nowrap gap-1 overflow-x-auto pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`shrink-0 border px-3 py-2 font-mono text-xs font-bold transition-colors ${
              level === lvl ? "border-signal bg-signal text-cream" : "border-ink/30 bg-card hover:border-ink"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Showing {filtered.length} of {cat.resources.length}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <ResourceCard key={r.url + i} resource={r} index={i} />
        ))}
      </div>

      {/* Pager */}
      <div className="mt-16 grid gap-3 border-t border-ink/15 pt-8 sm:grid-cols-2">
        <Link
          to="/category/$slug"
          params={{ slug: prev.slug }}
          className="group flex items-center justify-between border border-ink/20 bg-card p-5 transition-all hover:border-ink/50 hover:brutal-shadow-sm hover:-translate-y-0.5"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">← Previous</div>
            <div className="mt-1 font-display font-bold group-hover:text-signal">{prev.emoji} {prev.name}</div>
          </div>
        </Link>
        <Link
          to="/category/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between border border-ink/20 bg-card p-5 text-right transition-all hover:border-ink/50 hover:brutal-shadow-sm hover:-translate-y-0.5"
        >
          <div className="ml-auto">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Next →</div>
            <div className="mt-1 font-display font-bold group-hover:text-signal">{next.emoji} {next.name}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
