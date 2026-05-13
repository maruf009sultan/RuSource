import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Target, BookOpen, Lightbulb, AlertTriangle, Check } from "lucide-react";
import { categories, getCategory } from "@/lib/resources";
import { ShareButton } from "@/components/share-button";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Russian Learning Roadmap A1 → C2 — Comprehensive Guide | Russify" },
      { name: "description", content: "A detailed CEFR-mapped roadmap from absolute beginner (A1) to native-like mastery (C2). Daily routines, milestones, common pitfalls, and curated resources for every stage." },
      { property: "og:title", content: "Russian Roadmap A1 → C2" },
      { property: "og:description", content: "Milestones, hours, daily routine, pitfalls and resources for each level." },
      { property: "og:url", content: "/roadmap" },
    ],
    links: [{ rel: "canonical", href: "/roadmap" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Russian A1 → C2 Roadmap",
        description: "Curated learning path from beginner to mastery, mapped to CEFR.",
        provider: { "@type": "Organization", name: "Russify" },
      }),
    }],
  }),
  component: RoadmapPage,
});

interface Stage {
  level: string;
  name: string;
  ru: string;
  hours: string;
  weeks: string;
  description: string;
  goals: string[];
  grammar: string[];
  vocab: string;
  daily: string[];
  pitfalls: string[];
  milestone: string;
  categories: string[];
  color: string;
  bg: string;
}

const STAGES: Stage[] = [
  {
    level: "A1", name: "Survival", ru: "Начальный",
    hours: "0–80h", weeks: "Weeks 1–8",
    description: "You learn to read Cyrillic, introduce yourself, and survive a coffee shop. The first 500 words and the present tense.",
    goals: ["Read & write all 33 Cyrillic letters", "Introduce yourself in 30 seconds", "Order food, ask directions, count to 1000", "Understand slow, scripted dialogue"],
    grammar: ["Present tense of regular -ать / -ить verbs", "Personal pronouns (я, ты, он/она, мы, вы, они)", "Gender of nouns (м/ж/ср)", "Nominative case only"],
    vocab: "300–500 high-frequency words",
    daily: ["15 min Anki / SRS deck (top 1000 words)", "10 min handwriting Cyrillic", "1 episode 'Russian From The Start' or equivalent podcast", "Shadow one dialogue out loud"],
    pitfalls: ["Skipping handwriting — you'll regret it at B1", "Memorizing words without their stress mark", "Ignoring the soft sign Ь — pronunciation traps appear immediately"],
    milestone: "Read a Russian street sign without sounding it out letter-by-letter.",
    categories: ["alphabet-phonetics", "pronunciation-speaking", "getting-started", "apps-gamified-learning"],
    color: "bg-emerald-500", bg: "bg-emerald-500",
  },
  {
    level: "A2", name: "Elementary", ru: "Элементарный",
    hours: "80–200h", weeks: "Months 2–6",
    description: "Past and future tenses, four of the six cases, and your first real conversations. You can describe yesterday and plan tomorrow.",
    goals: ["Talk about your day in past tense", "Make plans in future tense", "Use Nominative, Accusative, Genitive, Prepositional", "Hold a 5-minute conversation"],
    grammar: ["Past tense (-л/-ла/-ло/-ли)", "Future: imperfective (буду + infinitive) and perfective (conjugated)", "First 4 cases — singular forms", "Numbers + cases (1 час, 2 часа, 5 часов)"],
    vocab: "1,500–2,000 active words",
    daily: ["20 min SRS reviews", "1 short graded reader chapter", "10 min listening (Slow Russian, Russian Made Easy)", "Write 3 sentences about your day in a journal"],
    pitfalls: ["Avoiding cases — they don't go away", "Translating word-for-word from English", "Studying without speaking — find an italki tutor by month 3"],
    milestone: "Order a meal, ask the price, and complain about the weather — entirely in Russian.",
    categories: ["grammar", "vocabulary-phrases", "flashcards-srs", "russian-for-kids"],
    color: "bg-emerald-600", bg: "bg-emerald-600",
  },
  {
    level: "B1", name: "Intermediate", ru: "Средний",
    hours: "200–500h", weeks: "Months 6–14",
    description: "All six cases. Verbs of motion. Aspect (perfective vs imperfective) clicks. You're comfortable in everyday topics and starting to consume real Russian content.",
    goals: ["Master all six cases — singular & plural", "Verbs of motion (идти/ходить, ехать/ездить + prefixes)", "Aspect pairs feel intuitive", "Watch Russian YouTube with subtitles"],
    grammar: ["Instrumental & Dative cases", "Verbs of motion with prefixes (по-, при-, у-, в-, вы-)", "Aspect: imperfective vs perfective", "Reflexive verbs (-ся / -сь)", "Comparatives & superlatives"],
    vocab: "3,000–4,000 active words",
    daily: ["30 min SRS + sentence mining from real content", "20 min YouTube (Russian with Max, Ru-Land Club)", "1 podcast episode (RT, Slow Russian News)", "30 min italki conversation (2–3×/week)"],
    pitfalls: ["The 'intermediate plateau' — variety beats discipline now", "Memorizing verb pairs in isolation instead of in sentences", "Reading too easy material — push to native YA novels"],
    milestone: "Watch a 20-minute YouTube video in Russian without subs and follow 70%+ of it.",
    categories: ["courses-moocs", "podcasts-audio", "youtube-video", "reading-practice-books"],
    color: "bg-amber-500", bg: "bg-amber-500",
  },
  {
    level: "B2", name: "Upper-Intermediate", ru: "Выше среднего",
    hours: "500–800h", weeks: "Year 1.5–2.5",
    description: "Fluent in most situations. You argue a point, follow the news, and read literature with a dictionary. The boundary between 'student' and 'speaker'.",
    goals: ["Read newspapers (Meduza, Lenta, RBC) daily", "Watch films & series without subs", "Write a 500-word structured essay", "Pass TORFL-2 / B2"],
    grammar: ["Participles (active/passive, present/past)", "Gerunds (-я / -в)", "Subjunctive mood (бы)", "Reported speech", "Complex prepositions"],
    vocab: "5,000–8,000 active words",
    daily: ["1 newspaper article read & summarized in Russian", "1 episode of a Russian series (Кухня, Молодёжка, Слово пацана)", "Daily journal entry (~150 words)", "Weekly tutor session focused on errors"],
    pitfalls: ["Plateauing on TV alone — write & speak more", "Avoiding formal/written Russian", "Translating, not thinking, in Russian"],
    milestone: "Argue politics or philosophy with a native speaker for 10 minutes without switching to English.",
    categories: ["movies-tv", "news-media", "music-songs", "language-exchange-communities"],
    color: "bg-amber-600", bg: "bg-amber-600",
  },
  {
    level: "C1", name: "Advanced", ru: "Продвинутый",
    hours: "800–1200h", weeks: "Year 2.5–4",
    description: "Discuss abstract topics. Read Tolstoy with footnotes. Subtle grammar. Near-native comprehension across registers — formal, colloquial, slang, archaic.",
    goals: ["Read Russian classics (Чехов, Булгаков, Достоевский)", "Academic & professional writing", "Master idioms and cultural nuance", "Hold professional contexts (interviews, presentations)"],
    grammar: ["Subtle aspect choices in narrative", "Stylistic register switching", "Archaic/literary forms (sing/plur of сей, оный, etc.)", "Word-formation morphology (prefixes, suffixes by hand)"],
    vocab: "10,000+ active words; passive much higher",
    daily: ["30 pages of Russian literature", "1 long-form article (Republic, Холод, Новая газета)", "Translation drill (RU↔EN both directions)", "Write 1 essay or analysis weekly"],
    pitfalls: ["Cultural fluency lag — read Russian Wikipedia daily", "Comfort zone with familiar topics", "Skipping pronunciation polish — get a native coach for ё/о/а reduction"],
    milestone: "Finish a Bulgakov novel in Russian and explain a chapter to a native speaker.",
    categories: ["culture-history", "linguistics-etymology", "writing-grammar-tools", "proficiency-tests-certification"],
    color: "bg-signal", bg: "bg-signal",
  },
  {
    level: "C2", name: "Mastery", ru: "В совершенстве",
    hours: "1200h+", weeks: "Year 4+",
    description: "Indistinguishable from an educated native. Specialized vocabulary, stylistic precision, wordplay, irony. You translate professionally or write in Russian for publication.",
    goals: ["Specialized fields (legal, medical, technical)", "Translate professionally in both directions", "Wordplay, humor, dialect awareness", "Literary analysis at academic level"],
    grammar: ["Stylistic & rhetorical mastery", "Dialectal & sociolectal awareness", "Pre-1918 orthography reading", "Etymological intuition"],
    vocab: "20,000+ words; specialist registers",
    daily: ["1 hour native-level reading (literature, philosophy, science)", "1 hour professional/specialist material in your field", "Daily writing in Russian (blog, journal, fiction)", "Active use — work, teach, or publish in Russian"],
    pitfalls: ["Calcifying — keep being a beginner in new domains", "Drift back to English for hard tasks", "Treating C2 as a destination instead of a practice"],
    milestone: "Write something in Russian that a native reader can't tell wasn't written by a native.",
    categories: ["specialized-russian", "blogs-learning-guides", "linguistics-etymology", "tts-speech-tools"],
    color: "bg-signal", bg: "bg-signal",
  },
];

function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Roadmap</div>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-6xl">
        A1 → C2.<br />
        <span className="text-signal">Your path</span> to fluency.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        A detailed CEFR-aligned roadmap. For each stage: hours, weekly cadence, grammar focus, daily routine, common pitfalls, and the curated resources from the directory.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <ShareButton url="/roadmap" title="Russian Roadmap A1 → C2" text="Detailed roadmap from beginner to mastery." variant="pill" />
        <Link to="/levels/$level" params={{ level: "A1" }} className="inline-flex items-center gap-2 bg-signal px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">
          Jump to A1 →
        </Link>
      </div>

      {/* Quick jump */}
      <nav aria-label="Jump to level" className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {STAGES.map((s) => (
          <a key={s.level} href={`#${s.level}`} className="group border-2 border-ink bg-card p-3 text-center transition-transform hover:-translate-y-0.5 dark:border-cream">
            <div className={`mx-auto h-2 w-8 ${s.color}`} aria-hidden />
            <div className="mt-2 font-display text-2xl font-black text-signal">{s.level}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.name}</div>
          </a>
        ))}
      </nav>

      <div className="mt-16 space-y-16">
        {STAGES.map((s, i) => (
          <motion.section
            key={s.level}
            id={s.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="scroll-mt-24 border-2 border-ink bg-card brutal-shadow dark:border-cream"
          >
            <header className={`flex flex-wrap items-center justify-between gap-3 ${s.bg} px-6 py-4 text-cream`}>
              <div className="flex items-baseline gap-3">
                <div className="font-display text-4xl font-black">{s.level}</div>
                <div>
                  <div className="font-display text-xl font-black">{s.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-90">{s.ru}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {s.hours}</span>
                <span className="hidden sm:inline">· {s.weeks}</span>
              </div>
            </header>

            <div className="p-6 sm:p-8">
              <p className="text-base text-muted-foreground">{s.description}</p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Block icon={<Target className="h-3.5 w-3.5" />} title="Goals">
                  <ul className="space-y-2 text-sm">{s.goals.map((g) => <Li key={g}>{g}</Li>)}</ul>
                </Block>
                <Block icon={<BookOpen className="h-3.5 w-3.5" />} title="Grammar focus">
                  <ul className="space-y-2 text-sm">{s.grammar.map((g) => <Li key={g}>{g}</Li>)}</ul>
                  <div className="mt-3 border-t border-ink/10 pt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Vocabulary: <span className="text-foreground">{s.vocab}</span>
                  </div>
                </Block>
                <Block icon={<Clock className="h-3.5 w-3.5" />} title="Daily routine">
                  <ul className="space-y-2 text-sm">{s.daily.map((d) => <Li key={d}>{d}</Li>)}</ul>
                </Block>
                <Block icon={<AlertTriangle className="h-3.5 w-3.5" />} title="Common pitfalls">
                  <ul className="space-y-2 text-sm">{s.pitfalls.map((p) => <Li key={p} warn>{p}</Li>)}</ul>
                </Block>
              </div>

              <div className="mt-8 border-l-4 border-signal bg-background p-4">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-signal">
                  <Lightbulb className="h-3.5 w-3.5" /> Milestone — you're done with {s.level} when you can:
                </div>
                <p className="mt-2 font-display text-base font-bold">{s.milestone}</p>
              </div>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Recommended categories</div>
                  <Link to="/levels/$level" params={{ level: s.level }} className="font-mono text-[11px] uppercase tracking-widest text-signal hover:underline">
                    All {s.level} resources →
                  </Link>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.categories.map((slug) => {
                    const c = getCategory(slug);
                    if (!c) return null;
                    return (
                      <Link key={slug} to="/category/$slug" params={{ slug }} className="inline-flex items-center gap-1 border border-ink/20 bg-background px-2.5 py-1.5 font-mono text-[11px] hover:border-signal hover:text-signal">
                        <span aria-hidden>{c.emoji}</span>
                        <span>{c.name}</span>
                        <span className="ml-1 text-muted-foreground">({c.resources.length})</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-20 border-2 border-ink bg-signal p-8 text-cream brutal-shadow dark:border-cream">
        <h3 className="font-display text-2xl font-black">Ready to start?</h3>
        <p className="mt-2 max-w-xl text-cream/90">
          Don't overthink it. Pick A1 resources, learn the alphabet this week, and just begin.
        </p>
        <Link to="/category/$slug" params={{ slug: "alphabet-phonetics" }} className="mt-5 inline-block border-2 border-cream bg-cream px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-signal transition-transform hover:-translate-y-0.5">
          Start with the alphabet →
        </Link>
      </div>

      <div className="mt-12 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {categories.length} categories · all linked above
      </div>
    </div>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-ink/15 bg-background p-5">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-signal">
        {icon} {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Li({ children, warn }: { children: React.ReactNode; warn?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      {warn ? (
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden />
      ) : (
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden />
      )}
      <span>{children}</span>
    </li>
  );
}
