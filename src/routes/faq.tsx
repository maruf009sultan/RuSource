import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions about Learning Russian | Russify" },
      { name: "description", content: "Answers to common questions about learning Russian: how long it takes, where to start, the Cyrillic alphabet, cases, best resources, and more." },
      { property: "og:title", content: "Russian Learning FAQ" },
      { property: "og:description", content: "Real answers to the questions every Russian learner asks." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

const FAQS: Array<[string, string]> = [
  ["Is Russian hard to learn?", "Russian is rated Category III by the U.S. Foreign Service Institute — about 1100 class hours for English speakers to reach professional fluency. The Cyrillic alphabet takes a week. Cases and verbs of motion are the steep parts. With consistent daily exposure most learners reach a confident A2 in 6 months."],
  ["How long does it take to learn Russian?", "Roughly 200 hours to A2, 500 to B1, 1000 to B2, 2000+ to C1 — but quality of practice and exposure beats raw hours. The Russify roadmap maps every CEFR level to recommended resources."],
  ["Where do I start as an absolute beginner?", "Learn the Cyrillic alphabet first (5–7 days), then a phrasebook of 100 essential phrases, then a structured A1 course. Browse the Alphabet & Phonetics and Getting Started categories on Russify."],
  ["Is Duolingo enough to learn Russian?", "No app alone reaches fluency. Duolingo is good for streaks and basic vocabulary, but you need grammar resources, listening input (podcasts/YouTube), and speaking practice (italki, language exchange). Russify lists 700+ alternatives across every category."],
  ["What are the six Russian cases?", "Nominative (subject), Genitive (of/possession), Dative (to/for), Accusative (direct object), Instrumental (by/with), Prepositional (about/in). They mark a noun's role in the sentence and replace what English does with word order and prepositions."],
  ["Is Russian useful in 2026?", "Yes. ~258 million speakers, official in 4 countries, working language of the UN, dominant in Central Asia, the language of a vast literary, scientific, and cultural canon. Plus job markets in translation, intelligence, journalism, energy, and academia."],
  ["What's the best free Russian resource?", "Depends on your level. For absolute beginners: Russian Lessons (russianlessons.net). For intermediate: RT podcasts, Slow Russian, Russian with Max on YouTube. For grammar: Russian Grammar by Dr Curtis Ford. Russify's Browse page filters all 700+ resources by Free / Freemium / Paid."],
  ["Should I learn cursive Russian?", "For reading: yes — older signs, handwritten notes, and many Russians still write cursive. For writing: optional, print is universally accepted. Spend a weekend on it once you're past the alphabet."],
  ["How is Russify different from awesome-russian-language?", "Russify uses the same dataset, curated by @maruf009sultan. The repo is the source of truth. Russify adds search, filtering, the CEFR roadmap, the resource of the day, favorites, and a fast UI tuned for global learners on any device."],
  ["Is Russify free?", "Yes — completely free, no signup, no tracking, no ads. The dataset is open-source (CC0). The site is open-source."],
];

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ FAQ</div>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">
        Questions, answered.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        The questions every Russian learner asks — answered straight, without the marketing copy.
      </p>

      <div className="mt-12 space-y-4">
        {FAQS.map(([q, a], i) => (
          <details key={q} className="group border border-ink/15 bg-card open:border-signal">
            <summary className="flex cursor-pointer items-start justify-between gap-4 p-5 font-display text-base font-bold tracking-tight">
              <span><span className="mr-3 text-signal">{String(i + 1).padStart(2, "0")}</span>{q}</span>
              <span className="mt-1 shrink-0 font-mono text-signal transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="border-t border-ink/10 p-5 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 border-l-4 border-signal bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Have a question that isn't here?{" "}
          <a href="https://github.com/maruf009sultan/awesome-russian-language/issues" target="_blank" rel="noreferrer" className="text-signal hover:underline">
            Open an issue on GitHub
          </a>
          .
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <Link to="/roadmap" className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">See the roadmap →</Link>
        <Link to="/glossary" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">Glossary</Link>
      </div>
    </div>
  );
}
