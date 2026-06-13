import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary of Russian Learning Terms - CEFR, Cases, Aspect | RuSource" },
      { name: "description", content: "Plain-English definitions for every Russian-learning term you'll meet: CEFR levels, cases, aspect, palatalization, perfective, Cyrillic, and more." },
      { property: "og:title", content: "Russian Learning Glossary" },
      { property: "og:description", content: "Every Russian-learning term, defined." },
      { property: "og:url", content: absUrl("/glossary") },
      { name: "keywords", content: "russian learning terms, CEFR, russian cases, russian aspect, russian grammar terms, cyrillic, SRS, TORFL, verb aspect, russian cases explained" },
    ],
    links: [{ rel: "canonical", href: absUrl("/glossary") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Glossary", item: absUrl("/glossary") },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Russian Learning Glossary",
          hasDefinedTerm: TERMS_PLAIN.map(([t, d]) => ({ "@type": "DefinedTerm", name: t, description: d })),
        }),
      },
    ],
  }),
  component: GlossaryPage,
});

const TERMS: Array<[string, React.ReactNode]> = [
  ["Cyrillic", <>The 33-letter alphabet used to write Russian, derived from Greek uncial script. About 1/3 of letters look familiar to English readers, 1/3 are false friends, 1/3 are entirely new. Start with the <Link to="/category/$slug" params={{ slug: "alphabet-phonetics" }} className="text-signal hover:underline">Alphabet & Phonetics</Link> category.</>],
  ["CEFR", <>Common European Framework of Reference for Languages. The six-level scale (A1, A2, B1, B2, C1, C2) used worldwide to describe language proficiency. See the <Link to="/roadmap" className="text-signal hover:underline">A1-C2 roadmap</Link> for how each level maps to Russian.</>],
  ["A1 / A2", <>Beginner levels. Survival vocabulary, present tense, simple greetings (A1) - past/future, daily routines (A2). Browse <Link to="/levels/$level" params={{ level: "A1" }} className="text-signal hover:underline">A1 resources</Link> or <Link to="/levels/$level" params={{ level: "A2" }} className="text-signal hover:underline">A2 resources</Link>.</>],
  ["B1 / B2", <>Intermediate. All six cases (B1), comfortable in everyday topics, can argue a point and read newspapers (B2). Browse <Link to="/levels/$level" params={{ level: "B1" }} className="text-signal hover:underline">B1 resources</Link> or <Link to="/levels/$level" params={{ level: "B2" }} className="text-signal hover:underline">B2 resources</Link>.</>],
  ["C1 / C2", <>Advanced to Mastery. Read Russian classics, discuss abstract topics, near-native fluency. Browse <Link to="/levels/$level" params={{ level: "C1" }} className="text-signal hover:underline">C1 resources</Link> or <Link to="/levels/$level" params={{ level: "C2" }} className="text-signal hover:underline">C2 resources</Link>.</>],
  ["TORFL", <>Test of Russian as a Foreign Language (TRKI in Russian). Official Russian-government certification, 6 levels mirroring CEFR. See the <Link to="/category/$slug" params={{ slug: "proficiency-tests-certification" }} className="text-signal hover:underline">Proficiency Tests</Link> category.</>],
  ["Case", <>Inflection that marks a noun's grammatical role. Russian has six: Nominative, Genitive, Dative, Accusative, Instrumental, Prepositional. Study them with <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar resources</Link>.</>],
  ["Aspect", <>Russian verbs come in pairs: imperfective (ongoing/repeated action) and perfective (single completed action). E.g. pisat'/napisat' = 'to write'. Explore <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar guides</Link>.</>],
  ["Verbs of motion", <>A class of ~14 verb pairs distinguishing one-direction (idti) from multi-direction or repeated (khodit') movement, then adding prefixes for nuance. See <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar resources</Link>.</>],
  ["Palatalization", <>'Softening' of consonants before front vowels (e, yo, i, yu, ya) or the soft sign ('). Critical to <Link to="/category/$slug" params={{ slug: "pronunciation-speaking" }} className="text-signal hover:underline">pronunciation</Link>.</>],
  ["Stress", <>Russian stress is unpredictable, mobile, and changes word meaning. Always learn words with their stress mark. Practice with <Link to="/category/$slug" params={{ slug: "pronunciation-speaking" }} className="text-signal hover:underline">speaking resources</Link>.</>],
  ["Reduction", <>Unstressed vowels weaken - o sounds like /a/, ya like /i/. The reason 'Moskva' sounds like /maskva/. See <Link to="/category/$slug" params={{ slug: "pronunciation-speaking" }} className="text-signal hover:underline">pronunciation guides</Link>.</>],
  ["Perfective", <>Aspect for completed, bounded actions. Often formed with prefixes added to imperfective verbs. Study with <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar resources</Link>.</>],
  ["Imperfective", <>Aspect for ongoing, repeated, or general actions. The default form found in most <Link to="/learn/$topic" params={{ topic: "beginners" }} className="text-signal hover:underline">beginner resources</Link>.</>],
  ["Conjugation", <>How Russian verbs change form for person and tense. Two main patterns: Conjugation I and Conjugation II. Learn with <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar guides</Link>.</>],
  ["Declension", <>How nouns, adjectives, and pronouns change form by case, number, and gender. Russian has three genders (masculine, feminine, neuter). Study with <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar resources</Link>.</>],
  ["Aspectual pair", <>Two verbs (one imperfective, one perfective) that share a meaning but encode it as ongoing vs completed. Memorize them as pairs. See <Link to="/learn/$topic" params={{ topic: "grammar" }} className="text-signal hover:underline">grammar guides</Link>.</>],
  ["Hard / soft sign", <>The hard sign and soft sign - letters with no sound of their own that signal whether a preceding consonant is 'soft' (palatalized) or 'hard'. See <Link to="/category/$slug" params={{ slug: "alphabet-phonetics" }} className="text-signal hover:underline">Alphabet & Phonetics</Link>.</>],
  ["Russian National Corpus", <>Authoritative searchable database of real Russian texts spanning centuries. Indispensable for <Link to="/levels/$level" params={{ level: "C1" }} className="text-signal hover:underline">advanced learners</Link> and linguists.</>],
  ["SRS", <>Spaced Repetition System. Algorithmically scheduled flashcards (Anki, Memrise, Quizlet) - the most evidence-backed vocabulary tool. Browse <Link to="/category/$slug" params={{ slug: "flashcards-srs" }} className="text-signal hover:underline">flashcard & SRS tools</Link>.</>],
];

const TERMS_PLAIN: Array<[string, string]> = [
  ["Cyrillic", "The 33-letter alphabet used to write Russian, derived from Greek uncial script. About 1/3 of letters look familiar to English readers, 1/3 are false friends, 1/3 are entirely new."],
  ["CEFR", "Common European Framework of Reference for Languages. The six-level scale (A1, A2, B1, B2, C1, C2) used worldwide to describe language proficiency."],
  ["A1 / A2", "Beginner levels. Survival vocabulary, present tense, simple greetings (A1) - past/future, daily routines (A2)."],
  ["B1 / B2", "Intermediate. All six cases (B1), comfortable in everyday topics, can argue a point and read newspapers (B2)."],
  ["C1 / C2", "Advanced to Mastery. Read Russian classics, discuss abstract topics, near-native fluency."],
  ["TORFL", "Test of Russian as a Foreign Language (TRKI in Russian). Official Russian-government certification, 6 levels mirroring CEFR."],
  ["Case", "Inflection that marks a noun's grammatical role. Russian has six: Nominative, Genitive, Dative, Accusative, Instrumental, Prepositional."],
  ["Aspect", "Russian verbs come in pairs: imperfective (ongoing/repeated action) and perfective (single completed action)."],
  ["Verbs of motion", "A class of ~14 verb pairs distinguishing one-direction from multi-direction or repeated movement, then adding prefixes for nuance."],
  ["Palatalization", "'Softening' of consonants before front vowels or the soft sign. Critical to Russian phonetics."],
  ["Stress", "Russian stress is unpredictable, mobile, and changes word meaning. Always learn words with their stress mark."],
  ["Reduction", "Unstressed vowels weaken. The reason 'Moskva' sounds like /maskva/, not /moskva/."],
  ["Perfective", "Aspect for completed, bounded actions. Often formed with prefixes added to imperfective verbs."],
  ["Imperfective", "Aspect for ongoing, repeated, or general actions. The default form found in most beginner resources."],
  ["Conjugation", "How Russian verbs change form for person and tense. Two main patterns: Conjugation I and Conjugation II."],
  ["Declension", "How nouns, adjectives, and pronouns change form by case, number, and gender. Russian has three genders."],
  ["Aspectual pair", "Two verbs (one imperfective, one perfective) that share a meaning but encode it as ongoing vs completed."],
  ["Hard / soft sign", "Letters with no sound of their own that signal whether a preceding consonant is 'soft' (palatalized) or 'hard'."],
  ["Russian National Corpus", "Authoritative searchable database of real Russian texts spanning centuries. Indispensable for advanced learners and linguists."],
  ["SRS", "Spaced Repetition System. Algorithmically scheduled flashcards - the most evidence-backed vocabulary tool."],
];

function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-signal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-signal">Glossary</span>
      </nav>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-signal">§ Glossary</div>
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
