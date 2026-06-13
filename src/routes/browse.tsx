import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { Search, X, Filter } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";
import { allResources, categories, LEVELS, levelMatches } from "@/lib/resources";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/browse")({
  head: ({ search }) => {
    const q = typeof search === "object" && search !== null && "q" in search
      ? String((search as Record<string, string>).q || "")
      : "";
    const title = q.trim()
      ? `"${q.trim()}" - Search Russian Resources | RuSource`
      : `Browse ${allResources.length}+ Russian Resources - RuSource`;
    const desc = q.trim()
      ? `Search results for "${q.trim()}" across ${allResources.length}+ Russian learning resources.`
      : `Search and filter the full directory of ${allResources.length}+ Russian learning resources by category, CEFR level, or pricing.`;
    return {
      meta: [
        { property: "og:url", content: absUrl("/browse") },
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: "browse russian resources, search russian learning, russian resource directory, filter russian by level, CEFR, russian courses" },
      ],
      links: [{ rel: "canonical", href: absUrl("/browse") }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Browse", item: absUrl("/browse") },
          ],
        }),
      }],
    };
  },
  component: BrowsePage,
});

const PAGE_SIZE = 36;
const SUGGESTIONS = ["grammar", "podcast", "cyrillic", "A1", "dictionary", "YouTube", "flashcards", "beginner"];

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function BrowsePage() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  // Read ?q= from URL for SEO-discoverable search (Google sitelinks search box)
  const initialQuery = typeof searchParams === "object" && searchParams !== null && "q" in searchParams
    ? String((searchParams as Record<string, string>).q || "")
    : "";

  const [inputVal, setInputVal] = useState(initialQuery);
  const q = useDebouncedValue(inputVal, 180);
  const [level, setLevel] = useState<string>("All");
  const [cat, setCat] = useState<string>("all");
  const [pricing, setPricing] = useState<string>("all");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

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
  const hasFilters = q || level !== "All" || cat !== "all" || pricing !== "all";

  const reset = () => { setInputVal(""); setLevel("All"); setCat("all"); setPricing("all"); setPage(1); };

  // Update URL with search query for shareability / SEO discoverability
  useEffect(() => {
    if (q.trim()) {
      navigate({ search: { q: q.trim() }, replace: true });
    } else {
      navigate({ search: {}, replace: true });
    }
  }, [q, navigate]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-signal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-signal">Browse</span>
      </nav>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-signal">§ Browse</div>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
        All {allResources.length} resources.
      </h1>
      <p className="mt-2 text-muted-foreground">Search, filter, save. The whole library at your fingertips.</p>
      <div className="mt-4">
        <ShareButton
          url="/browse"
          title={`Browse ${allResources.length}+ Russian Resources - RuSource`}
          text={`Search ${allResources.length}+ curated Russian-learning resources by category, CEFR level, or pricing.`}
          variant="pill"
        />
      </div>

      {/* SEARCH */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); setPage(1); }}
            placeholder={`Search ${allResources.length} resources… try 'podcast', 'cyrillic', 'tolstoy'`}
            className="h-14 w-full border-2 border-ink bg-card pl-12 pr-12 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-signal dark:border-cream"
          />
          {!inputVal && (
            <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded border border-ink/30 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground dark:border-cream/20">
              /
            </kbd>
          )}
          {inputVal && (
            <button
              onClick={() => { setInputVal(""); setPage(1); inputRef.current?.focus(); }}
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
        {hasFilters && (
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
          <p className="mt-2 text-muted-foreground">
            {q.trim()
              ? <>No results for "<span className="text-foreground font-semibold">{q.trim()}</span>". Try a different term or clear your filters.</>
              : "No resources match the current filters. Try adjusting them."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Try:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => { setInputVal(s); setLevel("All"); setCat("all"); setPricing("all"); setPage(1); }}
                className="border border-ink/30 bg-card px-3 py-1.5 font-mono text-xs font-bold transition-colors hover:border-signal hover:text-signal"
              >
                {s}
              </button>
            ))}
          </div>
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
