import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, RefreshCw, ExternalLink } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";
import { getResourceOfTheDay, getRandomResource } from "@/lib/discovery";
import { allResources, resourceShareUrl, type EnrichedResource } from "@/lib/resources";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Russian Resource of the Day — Russify" },
      { name: "description", content: "A new hand-picked Russian-learning resource every day. Open it. Use it. Come back tomorrow." },
      { name: "keywords", content: "russian resource of the day, learn russian daily, russian language tip" },
      { property: "og:title", content: "Russian Resource of the Day" },
      { property: "og:description", content: "One curated resource per day to keep your Russian momentum." },
      { property: "og:url", content: "/daily" },
    ],
    links: [{ rel: "canonical", href: "/daily" }],
  }),
  component: DailyPage,
});

function DailyPage() {
  const [pick, setPick] = useState<EnrichedResource | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [isRandom, setIsRandom] = useState(false);
  const [related, setRelated] = useState<EnrichedResource[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const todays = getResourceOfTheDay();
    const found = allResources.find((r) => r.url === todays.resource.url) ?? allResources[0];
    setPick(found);
    setDate(todays.date);
    setIsRandom(false);
    setRelated(allResources.filter((r) => r.categorySlug === found.categorySlug && r.url !== found.url).slice(0, 3));
  }, []);

  const tryRandom = () => {
    let next = getRandomResource();
    if (pick && next.url === pick.url) next = getRandomResource();
    setPick(next);
    setIsRandom(true);
    setRelated(allResources.filter((r) => r.categorySlug === next.categorySlug && r.url !== next.url).slice(0, 3));
    setRefreshKey((k) => k + 1);
  };

  const resetToday = () => {
    const todays = getResourceOfTheDay();
    const found = allResources.find((r) => r.url === todays.resource.url) ?? allResources[0];
    setPick(found);
    setIsRandom(false);
    setRelated(allResources.filter((r) => r.categorySlug === found.categorySlug && r.url !== found.url).slice(0, 3));
    setRefreshKey((k) => k + 1);
  };

  if (!pick || !date) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">Loading today's pick…</div>;
  }

  const dateStr = date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const shareUrl = resourceShareUrl(pick.categorySlug, pick.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
          <Sparkles className="h-3 w-3" /> § {isRandom ? "Random pick" : "Resource of the day"}
        </div>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">
          {isRandom ? "Lucky dip." : "Today's pick."}
        </h1>
        <div className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Calendar className="h-3 w-3" /> {dateStr}
        </div>
      </motion.div>

      <motion.article
        key={refreshKey}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-10 border-2 border-ink bg-card p-8 brutal-shadow dark:border-cream"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-signal/40 bg-signal/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-signal">
            {pick.level}
          </span>
          <Link
            to="/category/$slug"
            params={{ slug: pick.categorySlug }}
            className="border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider hover:text-signal"
          >
            {pick.categoryEmoji} {pick.category}
          </Link>
          {pick.types.map((t) => (
            <span key={t} className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t}</span>
          ))}
        </div>
        <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">{pick.title}</h2>
        <p className="mt-3 text-muted-foreground">{pick.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={pick.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5"
          >
            Open resource <ExternalLink className="h-4 w-4" />
          </a>
          <ShareButton url={shareUrl} title={pick.title} text={pick.description} variant="pill" />
          <button
            onClick={tryRandom}
            className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
          >
            <RefreshCw className="h-4 w-4" /> Try a random one
          </button>
          {isRandom && (
            <button
              onClick={resetToday}
              className="inline-flex items-center gap-2 border border-ink/30 bg-background px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-signal hover:text-signal"
            >
              ← Back to today's pick
            </button>
          )}
        </div>
      </motion.article>

      {related.length > 0 && (
        <section className="mt-16">
          <h3 className="font-display text-2xl font-black">More from {pick.category}</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r, i) => <ResourceCard key={r.url} resource={r} index={i} />)}
          </div>
        </section>
      )}

      <div className="mt-12 border border-ink/15 bg-card p-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Come back tomorrow — a new pick is generated every 24 hours (UTC).
      </div>
    </div>
  );
}
