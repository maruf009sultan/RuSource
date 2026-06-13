import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, Clock, ExternalLink } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { allResources } from "@/lib/resources";
import { ResourceCard } from "@/components/resource-card";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { property: "og:url", content: absUrl("/favorites") },
      { title: "Your Favorites - RuSource" },
      { name: "description", content: "Your saved Russian learning resources." },
      { name: "keywords", content: "saved russian resources, favorite russian learning, russian bookmarks, russian study list" },
    ],
    links: [{ rel: "canonical", href: absUrl("/favorites") }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Favorites", item: absUrl("/favorites") },
        ],
      }),
    }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { items: recentItems, clear: clearRecent } = useRecentlyViewed();
  const items = allResources.filter((r) => favorites.includes(r.url));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-signal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-signal">Favorites</span>
      </nav>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-signal">§ Saved</div>
      <div className="mt-2 flex items-center gap-3">
        <Heart className="h-8 w-8 text-signal" fill="currentColor" />
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Your favorites</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        {items.length === 0
          ? "Nothing saved yet. Tap the heart on any resource to keep it here."
          : `${items.length} saved resource${items.length === 1 ? "" : "s"}. Stored in your browser only.`}
      </p>

      {items.length === 0 ? (
        <div className="mt-16 border-2 border-dashed border-ink/30 p-12 text-center">
          <div className="font-display text-6xl opacity-50">🤍</div>
          <h3 className="mt-4 font-display text-2xl font-bold">No favorites yet</h3>
          <p className="mt-2 text-muted-foreground">Browse the directory and bookmark anything that catches your eye.</p>
          <Link
            to="/browse"
            className="mt-6 inline-flex items-center bg-signal px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream brutal-shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Browse resources →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <ResourceCard key={r.url} resource={r} index={i} showCategory />
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              if (confirm("Clear all favorites?")) {
                localStorage.removeItem("rusource:favorites");
                location.reload();
              }
            }}
            className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-signal hover:text-signal"
          >
            <Trash2 className="h-3 w-3" /> Clear all
          </button>
        </div>
      )}

      {/* RECENTLY VIEWED */}
      {recentItems.length > 0 && (
        <section className="mt-16" aria-labelledby="recently-viewed">
          <div className="flex items-center justify-between border-b border-ink/15 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 id="recently-viewed" className="font-display text-lg font-bold tracking-tight">Recently viewed</h2>
              <span className="font-mono text-xs text-muted-foreground">({recentItems.length})</span>
            </div>
            <button
              onClick={clearRecent}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-signal"
            >
              Clear
            </button>
          </div>
          <ul className="mt-4 divide-y divide-ink/10">
            {recentItems.map((entry) => (
              <li key={entry.url} className="flex items-center justify-between gap-3 py-2.5">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="truncate text-sm font-medium hover:text-signal"
                >
                  {entry.title}
                </a>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground hover:text-signal"
                  aria-label={`Open ${entry.title}`}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
