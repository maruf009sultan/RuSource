import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { allResources, categories, type EnrichedResource } from "@/lib/resources";
import { ResourceCard } from "@/components/resource-card";
import { ShareButton } from "@/components/share-button";

interface Topic {
  slug: string;
  title: string;
  h1: string;
  metaDesc: string;
  keywords: string;
  intro: string;
  longform: string[];
  filter: (r: EnrichedResource) => boolean;
  faq: { q: string; a: string }[];
}

const TOPICS: Record<string, Topic> = {
  free: {
    slug: "free",
    title: "Free Russian Learning Resources — 100% No-Cost Tools, Courses & Podcasts",
    h1: "Learn Russian for free.",
    metaDesc: "The complete list of 100% free Russian-learning resources — courses, podcasts, apps, YouTube channels, textbooks. No paywalls, no trials, no credit card.",
    keywords: "free russian lessons, free russian course, learn russian free, free russian resources, russian language free, free russian podcast",
    intro: "Every resource on this page is free forever. No credit card. No trial. No bait-and-switch.",
    longform: [
      "You don't need an expensive subscription to learn Russian. The internet is overflowing with brilliant free material — university courses, native podcasts, public-domain literature, open-source flashcard decks, YouTube channels run by patient teachers — but it's spread across a thousand corners of the web. This page collects every free resource in the Russify directory in one place.",
      "Whether you're starting from zero with the Cyrillic alphabet or reading Tolstoy at C2, there's enough free material here to take you the whole way. Mix and match: a free podcast for listening, a free Anki deck for vocabulary, a free YouTube series for grammar, a free corpus for reading practice. That's a full curriculum for $0.",
    ],
    filter: (r) => r.pricing === "free",
    faq: [
      { q: "Can you really learn Russian for free?", a: "Yes — completely. Every CEFR level (A1 through C2) is fully covered by free resources alone. Paid tools can speed you up, but they're never required." },
      { q: "What's the best free way to start?", a: "Start with the Cyrillic alphabet (1–2 weeks), then a free beginner podcast like 'Russian Made Easy', then a free SRS deck for the top 1000 words. That's your first month, free." },
    ],
  },
  podcasts: {
    slug: "podcasts",
    title: "Best Russian Learning Podcasts — Listening Practice for All Levels (A1–C2)",
    h1: "The best Russian podcasts.",
    metaDesc: "Curated Russian-language podcasts for learners — slow-speech beginner shows, intermediate news in simple Russian, native podcasts for advanced listeners.",
    keywords: "russian podcasts, learn russian podcast, russian listening practice, slow russian podcast, russian language podcast",
    intro: "Listening is the bottleneck for most learners. These podcasts unblock it.",
    longform: [
      "Russian listening is hard. Words run together, stress patterns shift, and native speech feels like one long compound word. The fix is daily exposure — and podcasts are the cheapest, most portable, most consistent way to get it. We've collected every podcast in the Russify directory below, sorted by level so you can pick one that matches your ear right now.",
      "Beginners: start with a 'slow Russian' podcast where the host speaks at half-speed and repeats key phrases. Intermediates: try 'easy news' shows that summarise current events in simple grammar. Advanced learners: throw yourself at native podcasts — comedy, true crime, philosophy — and let your brain bootstrap.",
    ],
    filter: (r) => r.types.some((t) => /podcast/i.test(t)) || /podcast/i.test(r.description) || /podcast/i.test(r.title),
    faq: [
      { q: "How long until I can understand a native Russian podcast?", a: "Most learners need ~600 hours of listening (roughly 18 months at 1 hr/day) to follow native podcasts comfortably. Slow-Russian podcasts work from week one." },
      { q: "Should I read transcripts while listening?", a: "Yes for beginner/intermediate — pair every podcast episode with its transcript. Advanced learners benefit more from blind listening and re-listening." },
    ],
  },
  apps: {
    slug: "apps",
    title: "Best Russian Learning Apps — Mobile Tools for Daily Practice",
    h1: "Russian apps that actually work.",
    metaDesc: "The best Russian-learning mobile apps — gamified courses, SRS flashcards, dictionary apps, grammar trainers — vetted and ranked.",
    keywords: "best russian app, learn russian app, russian flashcard app, russian language app, duolingo alternative russian",
    intro: "Apps for the bus ride, the queue, the in-between five minutes.",
    longform: [
      "Apps are the wrong tool to learn Russian — and the right tool to keep learning Russian. They're terrible at teaching grammar deeply, but unbeatable for daily streaks, vocabulary drills, and turning dead time into review time. Pair an app with one structured course and one listening source, and you have a sustainable routine.",
      "Below are every gamified course, SRS flashcard tool, and dictionary app currently tracked in the Russify directory.",
    ],
    filter: (r) => r.types.some((t) => /app/i.test(t)) || /\bapp(s)?\b|mobile|android|\bios\b/i.test(r.description) || /\bapp\b/i.test(r.title),
    faq: [
      { q: "Is Duolingo enough for Russian?", a: "No — Duolingo gives you streaks and vocabulary but skips most grammar. Pair it with a real course (free or paid) for serious progress." },
      { q: "Best app for Russian flashcards?", a: "Anki with a vetted top-5000 Russian deck is the gold standard, free, and works offline." },
    ],
  },
  beginners: {
    slug: "beginners",
    title: "How to Start Learning Russian as a Beginner — A1 Resources & Roadmap",
    h1: "Starting Russian from zero.",
    metaDesc: "The complete beginner's path: Cyrillic alphabet, first 500 words, present tense, your first conversation. Free A1 Russian resources, ranked.",
    keywords: "learn russian beginner, russian for beginners, A1 russian, start learning russian, cyrillic alphabet, how to learn russian from scratch",
    intro: "Day-one Russian. Cyrillic, your first 500 words, your first sentence.",
    longform: [
      "The first week of Russian feels impossible. By week three it feels inevitable. The trick is the right starter pack — alphabet first, then phonetics, then a tiny core of present-tense verbs, then your first 500 words, then a single short conversation you can hold from memory. That's the entire A1 stage in one paragraph.",
      "Below are every resource Russify has tagged for beginners (A1 / A1–A2). Pick one alphabet course, one starter podcast, one app, and one reading source. Resist the urge to collect more — depth beats breadth at this stage.",
    ],
    filter: (r) => /A1/i.test(r.level) || /beginner|зачаточн|начина/i.test(r.description),
    faq: [
      { q: "How long does it take to learn the Cyrillic alphabet?", a: "Most learners can read Cyrillic (slowly) in 3–7 days and read fluently in 4–6 weeks of regular practice." },
      { q: "What's the hardest part of beginner Russian?", a: "Pronunciation of unstressed vowels and the soft sign. Both feel impossible at first and obvious by month three." },
    ],
  },
  grammar: {
    slug: "grammar",
    title: "Russian Grammar Resources — Cases, Verbs, Aspect Explained Clearly",
    h1: "Russian grammar, untangled.",
    metaDesc: "The best Russian grammar resources for cases, verb aspect, motion verbs, and word order. Reference sites, courses, and books for every level.",
    keywords: "russian grammar, russian cases, russian verb aspect, russian motion verbs, learn russian grammar",
    intro: "Six cases. Two aspects. One reference shelf.",
    longform: [
      "Russian grammar has a reputation. Six cases. Two verb aspects. Verbs of motion that branch into a hedge maze. None of this is easy — but all of it is learnable with the right reference material that explains it once, clearly, instead of forcing you to piece it together from twenty Reddit threads.",
      "Every grammar-focused resource in the Russify directory is collected here. Use one as your primary reference and the rest as supplements when a specific topic refuses to click.",
    ],
    filter: (r) => /grammar|grammatik|case|aspect/i.test(r.description) || /grammar/i.test(r.title) || r.categorySlug.includes("grammar"),
    faq: [
      { q: "Which Russian case should I learn first?", a: "Nominative (already there) → Accusative → Prepositional → Genitive → Dative → Instrumental. Most courses teach in this order." },
      { q: "How do I master verb aspect?", a: "Don't 'master' it conceptually — absorb it through massive input. Read and listen to thousands of perfective/imperfective pairs in context." },
    ],
  },
  online: {
    slug: "online",
    title: "Learn Russian Online — Best Online Russian Courses, Tutors & Schools",
    h1: "Learn Russian online.",
    metaDesc: "Online Russian courses, live tutoring platforms, and virtual schools — from free MOOCs to one-on-one native tutors.",
    keywords: "learn russian online, online russian course, russian tutor online, russian classes online, best online russian school",
    intro: "Every online-first Russian course, school, and tutoring platform tracked by Russify.",
    longform: [
      "You don't have to fly to Moscow to learn Russian. Online instruction has matured to the point that a motivated learner with a webcam and a wired connection can reach C1 without leaving their bedroom. Group MOOCs handle the curriculum. One-on-one tutors handle the speaking and the awkward questions. Asynchronous courses handle the depth.",
      "Below are every course, school, and tutoring marketplace in the directory.",
    ],
    filter: (r) => r.types.some((t) => /course|school|tutor/i.test(t)) || /course|tutor|class|school|university|MOOC/i.test(r.description),
    faq: [
      { q: "Is online Russian as effective as in-person?", a: "For everything except cultural immersion, yes. The variable that matters is hours-per-week, not delivery method." },
      { q: "How much does an online Russian tutor cost?", a: "Native tutors on platforms like iTalki range from $10–$40/hour. Community tutors are cheaper, certified teachers are more." },
    ],
  },
};

export const Route = createFileRoute("/learn/$topic")({
  loader: ({ params }): Topic => {
    const t = TOPICS[params.topic];
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData ? [
      { title: loaderData.title },
      { name: "description", content: loaderData.metaDesc },
      { name: "keywords", content: loaderData.keywords },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.metaDesc },
      { property: "og:url", content: `/learn/${params.topic}` },
      { property: "og:type", content: "article" },
    ] : [],
    links: [{ rel: "canonical", href: `/learn/${params.topic}` }],
    scripts: loaderData ? [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: loaderData.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: loaderData.h1,
          description: loaderData.metaDesc,
        }),
      },
    ] : [],
  }),
  component: TopicPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-black">Topic not found</h1>
      <Link to="/" className="mt-6 inline-block text-signal hover:underline">← Home</Link>
    </div>
  ),
});

export const TOPIC_SLUGS = Object.keys(TOPICS);

function TopicPage() {
  const { topic } = Route.useParams();
  const t = TOPICS[topic];
  const matches = allResources.filter(t.filter);
  const visibleMatches = matches.slice(0, 60);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-signal">
        <ArrowLeft className="h-3 w-3" /> All resources
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
          <Sparkles className="h-3 w-3" /> § Collection · {matches.length} resources
        </div>
        <h1 className="mt-2 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
          {t.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">{t.intro}</p>
        <div className="mt-6">
          <ShareButton url={`/learn/${t.slug}`} title={t.title} text={t.metaDesc} variant="pill" />
        </div>
      </motion.div>

      <article className="prose prose-neutral mt-12 max-w-3xl text-lg leading-relaxed text-foreground/90 dark:prose-invert">
        {t.longform.map((p, i) => <p key={i} className="mb-5">{p}</p>)}
      </article>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-black tracking-tight">
          {matches.length} {matches.length === 1 ? "resource" : "resources"}
        </h2>
        {matches.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No matches yet — this collection is being built.</p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleMatches.map((r, i) => (
              <ResourceCard key={r.url} resource={r} index={i} showCategory />
            ))}
          </div>
        )}
        {matches.length > visibleMatches.length && (
          <div className="mt-8 text-center">
            <Link to="/browse" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-6 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">
              See all {matches.length} in browse <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      <section className="mt-20 border-t border-ink/15 pt-10">
        <h2 className="font-display text-3xl font-black tracking-tight">Frequently asked</h2>
        <div className="mt-8 space-y-6">
          {t.faq.map((f) => (
            <div key={f.q} className="border-l-4 border-signal bg-card px-6 py-4">
              <h3 className="font-display text-lg font-bold">{f.q}</h3>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-ink/15 pt-10">
        <h2 className="font-display text-2xl font-black">More curated collections</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(TOPICS).filter((x) => x.slug !== t.slug).map((other) => (
            <Link
              key={other.slug}
              to="/learn/$topic"
              params={{ topic: other.slug }}
              className="group flex items-center justify-between border border-ink/15 bg-card p-4 transition-all hover:border-signal hover:brutal-shadow-sm hover:-translate-y-0.5"
            >
              <span className="font-display font-bold group-hover:text-signal">{other.h1}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" />
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Curated from <Link to="/browse" className="hover:text-signal">{categories.length} categories</Link>
      </div>
    </div>
  );
}
