import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles, Map, Github, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { categories, totalResources, allResources, type Resource } from "@/lib/resources";
import { CategoryTile } from "@/components/category-tile";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Russify — ${totalResources}+ Curated Resources to Learn Russian` },
      { name: "description", content: `Discover ${totalResources}+ free and paid resources to learn Russian — alphabet, grammar, podcasts, courses, apps, and more. Filter by CEFR level A1 to C2.` },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Russian learning categories",
        numberOfItems: categories.length,
        itemListElement: categories.slice(0, 30).map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `/category/${c.slug}`,
        })),
      }),
    }],
  }),
  component: Home,
});

const FEATURED_TITLES = [
  "Между нами (Mezhdu Nami)",
  "RussianFilmHub",
  "Russian National Corpus",
];

function Home() {
  const featured = allResources.filter((r) => FEATURED_TITLES.some((t) => r.title.includes(t.split(" ")[0])));
  // Stable initial value (first 6) → matches SSR; reshuffled on client only after mount
  const [random, setRandom] = useState<Resource[]>(() => allResources.slice(0, 6));
  const reshuffle = () => {
    setRandom([...allResources].sort(() => Math.random() - 0.5).slice(0, 6));
  };
  useEffect(() => { reshuffle(); }, []);

  return (
    <>
      {/* SEO: hidden long-tail keyword block, accessible to crawlers + screen readers */}
      <h1 className="sr-only">
        Russify — Learn Russian Online Free: {totalResources}+ Curated Resources, Courses, Podcasts, Apps, Books and Tools for A1, A2, B1, B2, C1, C2 (CEFR) Learners
      </h1>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/15">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -right-20 -top-20 hidden h-96 w-96 rotate-12 bg-signal/10 md:block animate-float-slow" />
        <div className="absolute right-10 top-10 hidden h-32 w-32 rounded-full border-4 border-signal md:block animate-spin-slow" />
        <div aria-hidden className="aurora-blob absolute -left-24 top-1/3 hidden h-72 w-72 rounded-full bg-signal/20 blur-3xl md:block" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-ink/20 bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest sm:text-xs"
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-signal" />
            {totalResources}+ resources · {categories.length} categories · 100% curated
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-black leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            Learn{" "}
            <span className="relative inline-block">
              <span className="text-shimmer">Русский</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 4 Q 50 0, 100 4 T 200 4" stroke="currentColor" strokeWidth="3" fill="none" className="text-signal" />
              </svg>
            </span>
            .<br />
            From А <span className="text-muted-foreground">to</span> Я.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            The internet's most comprehensive directory of Russian-learning resources.
            Hand-picked. Globally accessible. From total beginner to native fluency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/browse"
              className="group inline-flex items-center gap-2 bg-signal px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-cream brutal-shadow transition-transform hover:-translate-y-0.5"
            >
              <Search className="h-4 w-4" />
              Browse all resources
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 border-2 border-ink bg-background px-6 py-4 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
            >
              <Map className="h-4 w-4" />
              Learning roadmap
            </Link>
            <ShareButton
              url="/"
              title={`Russify — ${totalResources}+ Resources to Learn Russian`}
              text={`Hand-picked directory of ${totalResources}+ Russian-learning resources, A1 → C2.`}
              variant="pill"
            />
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-4">
            {[
              { v: totalResources.toString(), l: "Resources" },
              { v: categories.length.toString(), l: "Categories" },
              { v: "A1—C2", l: "All Levels" },
              { v: "100%", l: "Curated" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-5 text-center sm:p-6">
                <div className="font-display text-3xl font-black text-signal sm:text-4xl">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="border-t border-ink/15 bg-ink py-3 text-cream dark:bg-card">
          <div className="marquee-mask overflow-hidden">
            <div className="animate-marquee flex w-max gap-12 font-display text-sm font-bold uppercase tracking-widest">
              {Array.from({ length: 2 }).flatMap((_, i) =>
                ["Привет 👋", "Спасибо 🙏", "До свидания ✋", "Я люблю русский ❤️", "Доброе утро ☀️", "Книга 📖", "Музыка 🎵", "Кино 🎬", "Учиться · To Learn", "Язык · Language"].map((w) => (
                  <span key={`${i}-${w}`} className="shrink-0">{w}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-b border-ink/15 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-signal">§ 01 / Categories</div>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-5xl">
              {categories.length} ways in.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              From the Cyrillic alphabet to academic linguistics — every entry point, in one place.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c, i) => (
              <CategoryTile key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EDITOR'S PICKS */}
      {featured.length > 0 && (
        <section className="border-b border-ink/15 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
                <Sparkles className="h-3 w-3" /> § 02 / Editor's picks
              </div>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Start here.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                If you do nothing else from this list — bookmark these.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 3).map((r, i) => (
                <ResourceCard key={r.url} resource={r} index={i} showCategory />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RANDOM DISCOVERY */}
      <section className="border-b border-ink/15 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal">§ 03 / Discover</div>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Surprise me.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A random sample from the archive.
              </p>
            </div>
            <button
              onClick={reshuffle}
              className="group flex items-center gap-2 border-2 border-ink bg-background px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
            >
              <Shuffle className="h-4 w-4 transition-transform group-hover:rotate-180" /> Shuffle
            </button>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {random.map((r, i) => (
              <ResourceCard key={r.url} resource={r} index={i} showCategory />
            ))}
          </div>
        </div>
      </section>

      {/* SEO INTERNAL LINKS — popular searches */}
      <section className="border-b border-ink/15 bg-card/40 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Popular</div>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-5xl">
            Where learners go.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Hand-curated entry points for the most-searched ways to start.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/learn/$topic" as const, params: { topic: "free" }, label: "Free Russian Lessons", desc: "100% no-cost resources" },
              { to: "/learn/$topic" as const, params: { topic: "podcasts" }, label: "Best Russian Podcasts", desc: "Listen on the go" },
              { to: "/learn/$topic" as const, params: { topic: "apps" }, label: "Top Russian Apps", desc: "Mobile-first learning" },
              { to: "/learn/$topic" as const, params: { topic: "grammar" }, label: "Russian Grammar Guides", desc: "Cases, verbs, aspect" },
              { to: "/levels/$level" as const, params: { level: "A1" }, label: "Russian for Beginners (A1)", desc: "Cyrillic & first words" },
              { to: "/levels/$level" as const, params: { level: "B1" }, label: "Intermediate Russian (B1)", desc: "Conversation level" },
              { to: "/levels/$level" as const, params: { level: "C1" }, label: "Advanced Russian (C1)", desc: "Native-like fluency" },
              { to: "/roadmap" as const, params: {}, label: "Full A1 → C2 Roadmap", desc: "From zero to fluent" },
              { to: "/faq" as const, params: {}, label: "Russian Learning FAQ", desc: "Common questions" },
            ].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              >
                <Link
                  to={l.to}
                  params={l.params as never}
                  className="group flex h-full items-start justify-between gap-4 border border-ink/15 bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-signal hover:brutal-shadow-sm"
                >
                  <div>
                    <div className="font-display text-sm font-bold group-hover:text-signal">{l.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{l.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIT */}
      <section className="relative overflow-hidden border-b border-ink/15 py-14 sm:py-20">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Credits</div>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-4xl">
              Built on open source.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every resource in this directory was curated by{" "}
              <a
                href="https://github.com/maruf009sultan"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-foreground underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
              >
                @maruf009sultan
              </a>
              {" "}in the open-source <em>awesome-russian-language</em> list. Russify is the interactive way to browse it.
            </p>
            <a
              href="https://github.com/maruf009sultan/awesome-russian-language"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-2 border-ink bg-background px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
            >
              <Github className="h-4 w-4" />
              Star the source on GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
