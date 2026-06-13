import { createFileRoute, Link } from "@tanstack/react-router";
import { totalResources, categories } from "@/lib/resources";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:url", content: absUrl("/about") },
      { title: "About - RuSource" },
      { name: "description", content: "About RuSource - a curated, open-source directory of Russian learning resources for global learners." },
      { name: "keywords", content: "about rusource, russian resource directory, curated russian resources, learn russian, open source russian" },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "About", item: absUrl("/about") },
        ],
      }),
    }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-signal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-signal">About</span>
      </nav>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-signal">§ About</div>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">
        For everyone learning <span className="text-signal">Русский</span>.
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          <strong>RuSource</strong> is a hand-curated directory of <strong>{totalResources}+ resources</strong> for learning the
          Russian language - across <Link to="/categories" className="text-signal hover:underline"><strong>{categories.length} categories</strong></Link>, all <Link to="/roadmap" className="text-signal hover:underline">CEFR levels</Link>, free and paid.
        </p>
        <p>
          Built for global learners. Every link is checked, every resource is tagged by <Link to="/browse" className="text-signal hover:underline">level</Link> and pricing.
          No ads, no logins. Your <Link to="/favorites" className="text-signal hover:underline">favorites</Link> live in your browser. Tiny analytics are collected for performance analysis only - no cookies, no personal data. See the <Link to="/faq" className="text-signal hover:underline">FAQ</Link> for common questions.
        </p>
        <p>
          The data is sourced from the open-source{" "}
          <a href="https://github.com/maruf009sultan/awesome-russian-language" target="_blank" rel="noreferrer" className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
            awesome-russian-language
          </a>{" "}
          list - released under CC0. Meet the <Link to="/maruf" className="text-signal hover:underline">creator</Link> or read the <Link to="/credits" className="text-signal hover:underline">full credits</Link>.
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

      {/* LINK TO US - backlink-friendly embed section */}
      <div className="mt-16 border-t border-ink/15 pt-8">
        <h2 className="font-display text-2xl font-black">Link to RuSource</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          If you found RuSource useful, help other learners find it too. Copy any snippet below and paste it into your blog, course page, or resource list.
        </p>
        <div className="mt-6 space-y-4">
          <div className="border border-ink/15 bg-card p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-signal">Text link</div>
            <code className="mt-2 block text-xs text-muted-foreground break-all">
              &lt;a href="https://rusource.org"&gt;RuSource - 749+ Curated Resources to Learn Russian&lt;/a&gt;
            </code>
          </div>
          <div className="border border-ink/15 bg-card p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-signal">Badge (dark)</div>
            <div className="mt-2 flex items-center gap-3">
              <a href="https://rusource.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-signal px-3 py-1.5 font-display text-sm font-bold text-cream" style={{ textDecoration: "none" }}>
                Я RuSource
              </a>
              <code className="text-xs text-muted-foreground break-all">
                &lt;a href="https://rusource.org"&gt;&lt;span style="background:#dc2626;color:#f5f0e6;padding:4px 12px;font-weight:700;font-family:sans-serif"&gt;Я RuSource&lt;/span&gt;&lt;/a&gt;
              </code>
            </div>
          </div>
          <div className="border border-ink/15 bg-card p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-signal">Markdown</div>
            <code className="mt-2 block text-xs text-muted-foreground break-all">
              [RuSource - 749+ Curated Resources to Learn Russian](https://rusource.org)
            </code>
          </div>
        </div>
      </div>

      <p className="mt-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Удачи! · Good luck!
      </p>
    </div>
  );
}
