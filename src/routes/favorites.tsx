import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { allResources } from "@/lib/resources";
import { ResourceCard } from "@/components/resource-card";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { property: "og:url", content: "/favorites" },
      { title: "Your Favorites — Russify" },
      { name: "description", content: "Your saved Russian learning resources." },
    ],
    links: [{ rel: "canonical", href: "/favorites" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useFavorites();
  const items = allResources.filter((r) => favorites.includes(r.url));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Saved</div>
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
                localStorage.removeItem("russify:favorites");
                location.reload();
              }
            }}
            className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-signal hover:text-signal"
          >
            <Trash2 className="h-3 w-3" /> Clear all
          </button>
        </div>
      )}
    </div>
  );
}
