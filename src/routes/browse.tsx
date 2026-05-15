import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, X, Filter } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";
import { allResources, categories, LEVELS, levelMatches } from "@/lib/resources";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { property: "og:url", content: "/browse" },
      { title: `Browse ${allResources.length}+ Russian Resources — Russify` },
      { name: "description", content: `Search and filter the full directory of ${allResources.length}+ Russian learning resources by category, CEFR level, or pricing.` },
    ],
    links: [{ rel: "canonical", href: "/browse" }],
  }),
  component: BrowsePage,
});

const PAGE_SIZE = 36;

function BrowsePage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<string>("All");
  const [cat, setCat] = useState<string>("all");
  const [pricing, setPricing] = useState<string>("all");
  const [page, setPage] = useState(1);

  const fuse = useMemo(
    () => new Fuse(allResources, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.3 },
        { name: "category", weight: 0.2 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    }),
    []
  );

  const filtered = useMemo(() => {
    let list = q.trim() ? fuse.search(q.trim()).map((r) => r.item) : allResources;
    if (cat !== "all") list = list.filter((r) => r.categorySlug === cat);
    if (level !== "All") list = list.filter((r) => levelMatches(r.level, level));
    if (pricing !== "all") list = list.filter((r) => r.pricing === pricing);
    return list;
  }, [q, level, cat, pricing, fuse]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const reset = () => { setQ(""); setLevel("All"); setCat("all"); setPricing("all"); setPage(1); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Browse</div>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
        All {allResources.length} resources.
      </h1>
      <p className="mt-2 text-muted-foreground">Search, filter, save. The whole library at your fingertips.</p>
      <div className="mt-4">
        <ShareButton
          url="/browse"
          title={`Browse ${allResources.length}+ Russian Resources — Russify`}
          text={`Search ${allResources.length}+ curated Russian-learning resources by category, CEFR level, or pricing.`}
          variant="pill"
        />
      </div>

      {/* SEARCH */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder={`Search ${allResources.length} resources… try 'podcast', 'cyrillic', 'tolstoy'`}
            className="h-14 w-full border-2 border-ink bg-card pl-12 pr-12 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-signal dark:border-cream"
          />
          {q && (
            <button
              onClick={() => { setQ(""); setPage(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-signal"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Category</label>
          <select
            value={cat}
            onChange={(e) => { setCat(e.target.value); setPage(1); }}
            className="h-10 w-full border border-ink/30 bg-card px-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-signal"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.emoji} {c.name} ({c.resources.length})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">CEFR Level</label>
          <div className="flex flex-wrap gap-1">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => { setLevel(lvl); setPage(1); }}
                className={`h-10 flex-1 min-w-[44px] border px-2 font-mono text-xs font-bold transition-colors ${
                  level === lvl ? "border-signal bg-signal text-cream" : "border-ink/30 bg-card hover:border-ink"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pricing</label>
          <div className="flex gap-1">
            {[
              { v: "all", l: "All" },
              { v: "free", l: "Free" },
              { v: "freemium", l: "Freemium" },
              { v: "paid", l: "Paid" },
            ].map((p) => (
              <button
                key={p.v}
                onClick={() => { setPricing(p.v); setPage(1); }}
                className={`h-10 flex-1 border px-2 font-mono text-xs font-bold transition-colors ${
                  pricing === p.v ? "border-signal bg-signal text-cream" : "border-ink/30 bg-card hover:border-ink"
                }`}
              >
                {p.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="mt-6 flex items-center justify-between border-y border-ink/15 py-3">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Filter className="mr-2 inline h-3 w-3" />
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </div>
        {(q || level !== "All" || cat !== "all" || pricing !== "all") && (
          <button onClick={reset} className="font-mono text-xs uppercase tracking-widest text-signal hover:underline">
            Clear filters ×
          </button>
        )}
      </div>

      {/* GRID */}
      {visible.length === 0 ? (
        <div className="py-24 text-center">
          <div className="font-display text-6xl">🔍</div>
          <h3 className="mt-4 font-display text-2xl font-bold">No matches</h3>
          <p className="mt-2 text-muted-foreground">Try a different search or clear your filters.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((r, i) => (
            <ResourceCard key={r.url + i} resource={r} index={i % PAGE_SIZE} showCategory={cat === "all"} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="border-2 border-ink bg-background px-8 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
          >
            Load more · {filtered.length - visible.length} remaining
          </button>
        </div>
      )}

      <div className="mt-12 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        ← <Link to="/" className="hover:text-signal">Home</Link>
      </div>
    </div>
  );
}
