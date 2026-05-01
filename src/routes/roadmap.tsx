import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories, getCategory } from "@/lib/resources";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Russian Learning Roadmap A1 → C2 | Russify" },
      { name: "description", content: "A clear A1-to-C2 roadmap for learning Russian, with curated resources for each stage." },
    ],
  }),
  component: RoadmapPage,
});

interface Stage {
  level: string;
  name: string;
  ru: string;
  hours: string;
  description: string;
  goals: string[];
  categories: string[]; // slugs
  color: string;
}

const STAGES: Stage[] = [
  {
    level: "A1",
    name: "Survival",
    ru: "Начальный",
    hours: "0–80h",
    description: "Cyrillic alphabet, basic greetings, numbers, simple present-tense sentences. The first 500 words.",
    goals: ["Read & write all 33 Cyrillic letters", "Introduce yourself", "Order food, ask directions", "Count to 1000"],
    categories: ["alphabet-phonetics", "pronunciation-speaking", "getting-started", "apps-gamified-learning"],
    color: "bg-emerald-500",
  },
  {
    level: "A2",
    name: "Elementary",
    ru: "Элементарный",
    hours: "80–200h",
    description: "Past and future tenses, common cases (nominative, accusative, prepositional). Holding short conversations.",
    goals: ["Talk about your day", "Six grammatical cases — basics", "1500–2000 active words", "Read children's stories"],
    categories: ["grammar", "vocabulary-phrases", "flashcards-srs", "russian-for-kids"],
    color: "bg-emerald-600",
  },
  {
    level: "B1",
    name: "Intermediate",
    ru: "Средний",
    hours: "200–500h",
    description: "All six cases, verbs of motion, aspect (perfective vs imperfective). Comfortable in everyday topics.",
    goals: ["Verbs of motion (идти/ходить...)", "Watch TV with subtitles", "Discuss opinions", "Read graded novels"],
    categories: ["courses-moocs", "podcasts-audio", "youtube-video", "reading-practice-books"],
    color: "bg-amber-500",
  },
  {
    level: "B2",
    name: "Upper-Intermediate",
    ru: "Выше среднего",
    hours: "500–800h",
    description: "Fluent in most situations. Argue a point. Understand the news. Read literature with a dictionary.",
    goals: ["Read newspapers", "Watch films without subs", "Write structured essays", "5000+ words vocabulary"],
    categories: ["movies-tv", "news-media", "music-songs", "language-exchange-communities"],
    color: "bg-amber-600",
  },
  {
    level: "C1",
    name: "Advanced",
    ru: "Продвинутый",
    hours: "800–1200h",
    description: "Discuss abstract topics. Read Tolstoy. Subtle grammar mastery. Near-native comprehension.",
    goals: ["Read Russian classics", "Academic writing", "Idioms & cultural nuance", "Professional contexts"],
    categories: ["culture-history", "linguistics-etymology", "writing-grammar-tools", "proficiency-tests-certification"],
    color: "bg-signal",
  },
  {
    level: "C2",
    name: "Mastery",
    ru: "В совершенстве",
    hours: "1200h+",
    description: "Indistinguishable from an educated native. Specialized vocabulary. Stylistic precision.",
    goals: ["Specialized fields (legal, medical)", "Translate professionally", "Wordplay & humor", "Literary analysis"],
    categories: ["specialized-russian", "blogs-learning-guides", "linguistics-etymology", "tts-speech-tools"],
    color: "bg-signal",
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
        A clear, milestone-based roadmap mapped to the CEFR framework. Each stage links to curated resources from the directory.
      </p>

      {/* Spine */}
      <div className="relative mt-16">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ink/15 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-12">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              {/* Dot */}
              <div className={`absolute left-4 top-6 h-4 w-4 -translate-x-1/2 ${s.color} brutal-shadow-sm sm:left-1/2`} />

              <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:pl-12"}`}>
                <div className="border-2 border-ink bg-card p-6 brutal-shadow dark:border-cream">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className={`inline-block px-3 py-1 font-display text-2xl font-black text-cream ${s.color}`}>
                      {s.level}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.hours}</div>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-black">{s.name}</h2>
                  <div className="font-mono text-xs uppercase tracking-widest text-signal">{s.ru}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>

                  <div className="mt-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Goals</div>
                    <ul className="mt-2 space-y-1.5">
                      {s.goals.map((g) => (
                        <li key={g} className="flex items-start gap-2 text-sm">
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${s.color}`} />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 border-t border-ink/15 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Recommended categories</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.categories.map((slug) => {
                        const c = getCategory(slug);
                        if (!c) return null;
                        return (
                          <Link
                            key={slug}
                            to="/category/$slug"
                            params={{ slug }}
                            className="inline-flex items-center gap-1 border border-ink/20 bg-background px-2 py-1 font-mono text-[11px] hover:border-signal hover:text-signal"
                          >
                            <span>{c.emoji}</span>
                            <span>{c.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-2 border-ink bg-signal p-8 text-cream brutal-shadow dark:border-cream">
        <h3 className="font-display text-2xl font-black">Ready to start?</h3>
        <p className="mt-2 max-w-xl text-cream/90">
          Don't overthink it. Pick A1 resources, learn the alphabet this week, and just begin.
        </p>
        <Link
          to="/category/$slug"
          params={{ slug: "alphabet-phonetics" }}
          className="mt-5 inline-block border-2 border-cream bg-cream px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-signal transition-transform hover:-translate-y-0.5"
        >
          Start with the alphabet →
        </Link>
      </div>

      <div className="mt-12 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {categories.length} categories · all linked above
      </div>
    </div>
  );
}
