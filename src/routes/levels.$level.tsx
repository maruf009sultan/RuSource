import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allResources, levelMatches } from "@/lib/resources";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";

const LEVEL_INFO: Record<string, { name: string; ru: string; hours: string; blurb: string; goals: string[] }> = {
  A1: { name: "Beginner / Survival", ru: "Начальный", hours: "0–80 hours", blurb: "Cyrillic, greetings, the first 500 words. The week-one of your Russian life.", goals: ["Read & write all 33 letters", "Order food & ask directions", "Introduce yourself", "Numbers to 1000"] },
  A2: { name: "Elementary", ru: "Элементарный", hours: "80–200 hours", blurb: "Past, future, the basic cases — and the start of real conversations.", goals: ["Talk about your day", "Six cases (basics)", "1500–2000 active words", "Read children's stories"] },
  B1: { name: "Intermediate", ru: "Средний", hours: "200–500 hours", blurb: "All six cases, verbs of motion, aspect. Comfortable in everyday topics.", goals: ["Verbs of motion", "TV with subtitles", "Discuss opinions", "Read graded novels"] },
  B2: { name: "Upper-Intermediate", ru: "Выше среднего", hours: "500–800 hours", blurb: "Fluent in most situations. Argue a point, understand the news.", goals: ["Read newspapers", "Watch films without subs", "Write essays", "5000+ words"] },
  C1: { name: "Advanced", ru: "Продвинутый", hours: "800–1200 hours", blurb: "Discuss abstract topics. Read Tolstoy. Subtle grammar mastery.", goals: ["Russian classics", "Academic writing", "Idioms & nuance", "Professional contexts"] },
  C2: { name: "Mastery / Native-like", ru: "В совершенстве", hours: "1200+ hours", blurb: "Indistinguishable from an educated native. Stylistic precision.", goals: ["Specialized fields", "Professional translation", "Wordplay & humor", "Literary analysis"] },
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const Route = createFileRoute("/levels/$level")({
  beforeLoad: ({ params }) => {
    if (!LEVEL_INFO[params.level.toUpperCase()]) throw notFound();
  },
  head: ({ params }) => {
    const lvl = params.level.toUpperCase();
    const info = LEVEL_INFO[lvl];
    return {
      meta: [
        { title: `Russian for ${lvl} (${info?.name}) — Curated Resources | Russify` },
        { name: "description", content: `Hand-picked resources to learn Russian at the ${lvl} ${info?.name} level. ${info?.blurb}` },
        { property: "og:title", content: `Learn Russian — ${lvl} ${info?.name}` },
        { property: "og:description", content: info?.blurb },
        { property: "og:url", content: `/levels/${lvl}` },
      ],
      links: [{ rel: "canonical", href: `/levels/${lvl}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Levels", item: "/roadmap" },
            { "@type": "ListItem", position: 3, name: `${lvl} ${info?.name}`, item: `/levels/${lvl}` },
          ],
        }),
      }],
    };
  },
  component: LevelPage,
});

function LevelPage() {
  const { level: rawLevel } = Route.useParams();
  const level = rawLevel.toUpperCase();
  const info = LEVEL_INFO[level];
  const matches = allResources.filter((r) => levelMatches(r.level, level));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-signal">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/roadmap" className="hover:text-signal">Levels</Link>
        <span className="mx-2">/</span>
        <span className="text-signal">{level}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div className="bg-signal px-4 py-2 font-display text-3xl font-black text-cream brutal-shadow-sm">{level}</div>
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
          Russian for <span className="text-signal">{info.name}</span>
        </h1>
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{info.ru} · {info.hours}</p>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{info.blurb}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <ShareButton url={`/levels/${level}`} title={`Russian for ${level}`} text={info.blurb} variant="pill" />
        <Link to="/browse" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform dark:border-cream">All resources</Link>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="border-2 border-ink bg-card p-6 dark:border-cream">
          <h2 className="font-display text-xl font-black">Goals at {level}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {info.goals.map((g) => (
              <li key={g} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal" />{g}</li>
            ))}
          </ul>
        </div>
        <div className="border-2 border-ink bg-card p-6 dark:border-cream">
          <h2 className="font-display text-xl font-black">Jump to another level</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <Link
                key={l}
                to="/levels/$level"
                params={{ level: l }}
                aria-current={l === level ? "page" : undefined}
                className={`border px-3 py-1.5 font-mono text-xs font-bold ${l === level ? "border-signal bg-signal text-cream" : "border-ink/20 hover:border-signal hover:text-signal"}`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-black">{matches.length} resources for {level}</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, 60).map((r, i) => (
            <ResourceCard key={r.url} resource={r} index={i} showCategory />
          ))}
        </div>
        {matches.length > 60 && (
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Showing 60 of {matches.length} · <Link to="/browse" className="text-signal hover:underline">view all in Browse</Link>
          </p>
        )}
      </section>
    </div>
  );
}
