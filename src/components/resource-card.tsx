import { Heart, ExternalLink, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { ShareButton } from "@/components/share-button";
import { allResources, resourceShareUrl, slugifyTitle, type Resource } from "@/lib/resources";

interface Props {
  resource: Resource & { id?: string; category?: string; categoryEmoji?: string; categorySlug?: string };
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
  const id = resource.id ?? slugifyTitle(resource.title);
  const ref = useRef<HTMLElement>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      if (window.location.hash === `#${id}`) {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlight(true);
        setTimeout(() => setHighlight(false), 2400);
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [id]);

  const domain = (() => {
    try { return new URL(resource.url).hostname.replace(/^www\./, ""); } catch { return ""; }
  })();

  // Always prefer an in-site shareable URL pointing at the card anchor.
  const enriched = resource.categorySlug
    ? { slug: resource.categorySlug, id }
    : (() => {
        const m = allResources.find((x) => x.url === resource.url);
        return m ? { slug: m.categorySlug, id: m.id } : null;
      })();
  const shareUrl = enriched ? resourceShareUrl(enriched.slug, enriched.id) : resource.url;

  return (
    <motion.article
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.35), ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative isolate flex scroll-mt-24 flex-col border bg-card p-5 transition-all duration-300 hover:border-signal/60 hover:brutal-shadow-sm ${
        highlight ? "border-signal ring-2 ring-signal/40 brutal-shadow" : "border-ink/15"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-signal/0 via-signal/0 to-signal/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-12 w-12 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-full origin-top-right scale-0 bg-signal transition-transform duration-300 group-hover:scale-100"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />
      </div>

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
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggle(resource.url); }}
          className={`relative z-20 flex h-7 w-7 shrink-0 items-center justify-center transition-all hover:scale-110 ${
            fav ? "text-signal" : "text-muted-foreground hover:text-signal"
          }`}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className="h-4 w-4 transition-transform" fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer noopener"
          className="after:absolute after:inset-0 after:z-10 hover:text-signal"
        >
          {resource.title}
        </a>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{resource.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink/10 pt-3 font-mono text-[11px]">
        {showCategory && resource.category ? (
          <span className="flex min-w-0 items-center gap-1 truncate text-muted-foreground">
            <Tag className="h-3 w-3 shrink-0" /> {resource.categoryEmoji} <span className="truncate">{resource.category}</span>
          </span>
        ) : (
          <span className="truncate text-muted-foreground">{domain}</span>
        )}
        <div className="relative z-20 flex shrink-0 items-center gap-0.5">
          <ShareButton url={shareUrl} title={resource.title} text={resource.description} variant="compact" />
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            aria-label="Open"
            className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-all hover:text-signal group-hover:translate-x-0.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
