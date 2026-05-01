import { Heart, ExternalLink, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";
import type { Resource } from "@/lib/resources";

interface Props {
  resource: Resource & { category?: string; categoryEmoji?: string; categorySlug?: string };
  index?: number;
  showCategory?: boolean;
}

const levelColor = (lvl: string): string => {
  const base = lvl.slice(0, 2);
  const map: Record<string, string> = {
    A1: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-600/30",
    A2: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-600/30",
    B1: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-600/30",
    B2: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-600/30",
    C1: "bg-signal/15 text-signal border-signal/30",
    C2: "bg-signal/15 text-signal border-signal/30",
  };
  return map[base] ?? "bg-muted text-muted-foreground border-border";
};

export function ResourceCard({ resource, index = 0, showCategory }: Props) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(resource.url);

  const domain = (() => {
    try { return new URL(resource.url).hostname.replace(/^www\./, ""); } catch { return ""; }
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3), ease: "easeOut" }}
      className="group relative flex flex-col border border-ink/15 bg-card p-5 transition-all hover:border-ink/40 hover:brutal-shadow-sm hover:-translate-y-0.5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${levelColor(resource.level)}`}>
            {resource.level}
          </span>
          {resource.pricing === "paid" && (
            <span className="border border-ink/30 bg-ink text-cream dark:bg-cream dark:text-ink px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
              Paid
            </span>
          )}
          {resource.pricing === "freemium" && (
            <span className="border border-gold/40 bg-gold/20 text-foreground px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
              Freemium
            </span>
          )}
          {resource.types.map((t) => (
            <span key={t} className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => toggle(resource.url)}
          className={`flex h-7 w-7 shrink-0 items-center justify-center transition-colors ${
            fav ? "text-signal" : "text-muted-foreground hover:text-signal"
          }`}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer noopener"
          className="after:absolute after:inset-0 hover:text-signal"
        >
          {resource.title}
        </a>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{resource.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink/10 pt-3 font-mono text-[11px]">
        {showCategory && resource.category ? (
          <span className="flex items-center gap-1 text-muted-foreground">
            <Tag className="h-3 w-3" /> {resource.categoryEmoji} {resource.category}
          </span>
        ) : (
          <span className="truncate text-muted-foreground">{domain}</span>
        )}
        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
      </div>
    </motion.article>
  );
}
