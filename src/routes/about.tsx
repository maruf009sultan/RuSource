import { createFileRoute, Link } from "@tanstack/react-router";
import { totalResources, categories } from "@/lib/resources";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:url", content: "/about" },
      { title: "About — Russify" },
      { name: "description", content: "About Russify — a curated, open-source directory of Russian learning resources for global learners." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ About</div>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">
        For everyone learning <span className="text-signal">Русский</span>.
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          <strong>Russify</strong> is a hand-curated directory of <strong>{totalResources}+ resources</strong> for learning the
          Russian language — across <strong>{categories.length} categories</strong>, all CEFR levels, free and paid.
        </p>
        <p>
          Built for global learners. Every link is checked, every resource is tagged by level and pricing.
          No ads, no tracking, no logins. Your favorites live in your browser.
        </p>
        <p>
          The data is sourced from the open-source{" "}
          <a href="https://github.com/maruf009sultan/awesome-russian-language" target="_blank" rel="noreferrer" className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
            awesome-russian-language
          </a>{" "}
          list — released under CC0.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { v: `${totalResources}+`, l: "Resources" },
          { v: categories.length.toString(), l: "Categories" },
          { v: "Free", l: "Forever" },
        ].map((s) => (
          <div key={s.l} className="border-2 border-ink bg-card p-5 text-center brutal-shadow-sm dark:border-cream">
            <div className="font-display text-3xl font-black text-signal">{s.v}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-ink/15 pt-8">
        <h2 className="font-display text-2xl font-black">Three ways to start</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link to="/roadmap" className="border border-ink/20 bg-card p-5 transition-all hover:border-ink/50 hover:brutal-shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">🗺️</div>
            <div className="mt-2 font-display font-bold">Follow the roadmap</div>
            <div className="mt-1 text-sm text-muted-foreground">A1 → C2 stages with picks for each level.</div>
          </Link>
          <Link to="/categories" className="border border-ink/20 bg-card p-5 transition-all hover:border-ink/50 hover:brutal-shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">📚</div>
            <div className="mt-2 font-display font-bold">Browse categories</div>
            <div className="mt-1 text-sm text-muted-foreground">{categories.length} themed collections, from alphabet to literature.</div>
          </Link>
          <Link to="/browse" className="border border-ink/20 bg-card p-5 transition-all hover:border-ink/50 hover:brutal-shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">🔍</div>
            <div className="mt-2 font-display font-bold">Search everything</div>
            <div className="mt-1 text-sm text-muted-foreground">Full-text search across all {totalResources} resources.</div>
          </Link>
        </div>
      </div>

      <p className="mt-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Удачи! · Good luck!
      </p>
    </div>
  );
}
