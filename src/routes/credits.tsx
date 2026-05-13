import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Heart, Star, GitFork, Globe } from "lucide-react";
import { categories, totalResources } from "@/lib/resources";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Credits & Acknowledgments — Russify" },
      { name: "description", content: "Credits to Maruf Sultan (@maruf009sultan), creator of awesome-russian-language — the open-source dataset that powers Russify." },
      { property: "og:title", content: "Credits — Russify" },
      { property: "og:description", content: "Meet the curator behind the dataset that powers Russify." },
      { property: "og:url", content: "/credits" },
    ],
    links: [{ rel: "canonical", href: "/credits" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Maruf Sultan",
        alternateName: "maruf009sultan",
        url: "https://github.com/maruf009sultan",
        sameAs: ["https://github.com/maruf009sultan/awesome-russian-language"],
        description: "Open-source maintainer & curator of the awesome-russian-language directory.",
      }),
    }],
  }),
  component: CreditsPage,
});

function CreditsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Credits</div>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">
        Built on the work of <span className="text-signal">@maruf009sultan</span>.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Russify is a presentation layer. Every link, every category, every careful annotation comes from a single open-source dataset, painstakingly maintained by one person.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 border-2 border-ink bg-card p-8 brutal-shadow dark:border-cream"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <a
            href="https://github.com/maruf009sultan"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
            aria-label="Maruf Sultan on GitHub"
          >
            <img
              src="https://github.com/maruf009sultan.png"
              alt="Maruf Sultan avatar"
              width={120}
              height={120}
              loading="lazy"
              className="h-30 w-30 border-2 border-ink dark:border-cream"
            />
          </a>
          <div>
            <h2 className="font-display text-3xl font-black">Maruf Sultan</h2>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-signal">@maruf009sultan</div>
            <p className="mt-3 text-muted-foreground">
              Open-source enthusiast and curator of <em>awesome-russian-language</em> — a community-driven, hand-vetted index of {totalResources}+ resources spanning {categories.length} categories. The repository is the reference dataset of the Russian-learning ecosystem on GitHub.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/maruf009sultan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
              >
                <Github className="h-3.5 w-3.5" /> GitHub Profile
              </a>
              <a
                href="https://github.com/maruf009sultan/awesome-russian-language"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-signal px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5"
              >
                <Star className="h-3.5 w-3.5" /> Star the repo
              </a>
              <a
                href="https://github.com/maruf009sultan/awesome-russian-language/fork"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream"
              >
                <GitFork className="h-3.5 w-3.5" /> Fork
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Card title="Why this exists" icon={<Heart className="h-4 w-4" />}>
          Learning Russian is intimidating. Apps oversell, search engines bury the gold, and most "best of" lists rot. Maruf built <em>awesome-russian-language</em> to be the antidote: one curated index, kept fresh, free forever, owned by no company.
        </Card>
        <Card title="Why Russify exists" icon={<Globe className="h-4 w-4" />}>
          The dataset deserves a home that does it justice. Russify is that home — a fast, accessible, beautiful interface so global learners can browse, filter, share, and commit to a path. Zero tracking, zero paywalls, zero noise.
        </Card>
      </section>

      <section className="mt-12 border-l-4 border-signal bg-card p-6">
        <h3 className="font-display text-xl font-black">The contract</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· All resource data is sourced verbatim from <a href="https://github.com/maruf009sultan/awesome-russian-language" target="_blank" rel="noreferrer" className="text-signal hover:underline">awesome-russian-language</a>.</li>
          <li>· The README is the single source of truth — Russify rebuilds when it changes.</li>
          <li>· Categories, taglines, descriptions, level tags & pricing flags are Maruf's curation.</li>
          <li>· Russify adds: search, filters, theming, sharing, the roadmap, the daily pick.</li>
          <li>· Built for the global Russian-learning community. Free as in libre.</li>
        </ul>
      </section>

      <section className="mt-12">
        <h3 className="font-display text-xl font-black">Tech stack credits</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {[
            ["TanStack Start", "https://tanstack.com/start"],
            ["React", "https://react.dev"],
            ["Tailwind CSS", "https://tailwindcss.com"],
            ["shadcn/ui", "https://ui.shadcn.com"],
            ["Framer Motion", "https://motion.dev"],
            ["Lucide Icons", "https://lucide.dev"],
            ["Cloudflare Workers", "https://workers.cloudflare.com"],
            ["Lovable", "https://lovable.dev"],
          ].map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="border border-ink/15 bg-card p-3 font-mono text-xs uppercase tracking-wider hover:border-signal hover:text-signal">
              {name} ↗
            </a>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link to="/" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">
          ← Home
        </Link>
        <Link to="/about" className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">
          About the project →
        </Link>
      </div>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border border-ink/15 bg-card p-6">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">{icon} {title}</div>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
