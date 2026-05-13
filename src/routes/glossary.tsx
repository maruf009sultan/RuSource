import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary of Russian Learning Terms — CEFR, Cases, Aspect | Russify" },
      { name: "description", content: "Plain-English definitions for every Russian-learning term you'll meet: CEFR levels, cases, aspect, palatalization, perfective, Cyrillic, and more." },
      { property: "og:title", content: "Russian Learning Glossary" },
      { property: "og:description", content: "Every Russian-learning term, defined." },
      { property: "og:url", content: "/glossary" },
    ],
    links: [{ rel: "canonical", href: "/glossary" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "Russian Learning Glossary",
        hasDefinedTerm: TERMS.map(([t, d]) => ({ "@type": "DefinedTerm", name: t, description: d })),
      }),
    }],
  }),
  component: GlossaryPage,
});

const TERMS: Array<[string, string]> = [
  ["Cyrillic", "The 33-letter alphabet used to write Russian, derived from Greek uncial script. About 1/3 of letters look familiar to English readers, 1/3 are false friends, 1/3 are entirely new."],
  ["CEFR", "Common European Framework of Reference for Languages. The six-level scale (A1, A2, B1, B2, C1, C2) used worldwide to describe language proficiency."],
  ["A1 / A2", "Beginner levels. Survival vocabulary, present tense, simple greetings (A1) → past/future, daily routines (A2)."],
  ["B1 / B2", "Intermediate. All six cases (B1), comfortable in everyday topics, can argue a point and read newspapers (B2)."],
  ["C1 / C2", "Advanced → Mastery. Read Russian classics, discuss abstract topics, near-native fluency."],
  ["TORFL", "Test of Russian as a Foreign Language (ТРКИ in Russian). Official Russian-government certification, 6 levels mirroring CEFR."],
  ["Case", "Inflection that marks a noun's grammatical role. Russian has six: Nominative, Genitive, Dative, Accusative, Instrumental, Prepositional."],
  ["Aspect", "Russian verbs come in pairs: imperfective (ongoing/repeated action) and perfective (single completed action). E.g. писать / написать = 'to write'."],
  ["Verbs of motion", "A class of ~14 verb pairs distinguishing one-direction (идти) from multi-direction or repeated (ходить) movement, then adding prefixes for nuance."],
  ["Palatalization", "'Softening' of consonants before front vowels (е, ё, и, ю, я) or the soft sign (ь). Critical to Russian phonetics."],
  ["Stress", "Russian stress is unpredictable, mobile, and changes word meaning (за́мок 'castle' vs замо́к 'lock'). Always learn words with their stress."],
  ["Reduction", "Unstressed vowels weaken — о sounds like /a/, я like /i/. The reason 'Москва' sounds like /maskvá/, not /moskvá/."],
  ["Perfective", "Aspect for completed, bounded actions. Often formed with prefixes (на-, про-, по-) added to imperfective verbs."],
  ["Imperfective", "Aspect for ongoing, repeated, or general actions. The default form found in most beginner resources."],
  ["Conjugation", "How Russian verbs change form for person (я, ты, он…) and tense. Two main patterns: Conjugation I (-ешь endings) and Conjugation II (-ишь endings)."],
  ["Declension", "How nouns, adjectives, and pronouns change form by case, number, and gender. Russian has three genders (masculine, feminine, neuter)."],
  ["Aspectual pair", "Two verbs (one imperfective, one perfective) that share a meaning but encode it as ongoing vs completed. Memorize them as pairs."],
  ["Hard / soft sign", "Ъ (твёрдый знак) and Ь (мягкий знак) — letters with no sound of their own that signal whether a preceding consonant is 'soft' (palatalized) or 'hard'."],
  ["Russian National Corpus (РНК)", "Authoritative searchable database of real Russian texts spanning centuries. Indispensable for advanced learners and linguists."],
  ["SRS", "Spaced Repetition System. Algorithmically scheduled flashcards (Anki, Memrise, Quizlet) — the most evidence-backed vocabulary tool."],
];

function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Glossary</div>
      <h1 className="mt-2 font-display text-5xl font-black tracking-tight sm:text-6xl">A → Я reference.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Every term you'll trip over while learning Russian, defined in one sentence.
      </p>

      <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/15">
        {TERMS.map(([t, d]) => (
          <div key={t} className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
            <dt className="font-display text-base font-black text-signal">{t}</dt>
            <dd className="text-sm text-muted-foreground sm:col-span-2">{d}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex gap-3">
        <Link to="/roadmap" className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">Pick a level →</Link>
        <Link to="/faq" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">FAQ</Link>
      </div>
    </div>
  );
}
