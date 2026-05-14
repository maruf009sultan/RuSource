import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Heart, Star, GitFork, Code2, Coffee, Mail, Quote, Sparkles, ArrowRight } from "lucide-react";
import { totalResources, categories } from "@/lib/resources";

export const Route = createFileRoute("/maruf")({
  head: () => ({
    meta: [
      { title: "Meet Maruf Sultan — The Mind Behind Russify | About the Creator" },
      { name: "description", content: "Why a non-Russian developer from Bangladesh built the largest open-source Russian-learning directory. Read Maruf Sultan's story, see his other projects, and learn how to contribute." },
      { name: "keywords", content: "maruf009sultan, Maruf Sultan, awesome-russian-language creator, open source Russian learning, contribute Russian language directory" },
      { property: "og:title", content: "Meet Maruf Sultan — Creator of awesome-russian-language" },
      { property: "og:description", content: "A Bangladeshi dev's quiet, stubborn love letter to a language he doesn't speak — and the reason Russify exists." },
      { property: "og:url", content: "/maruf" },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: "https://github.com/maruf009sultan.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://github.com/maruf009sultan.png" },
    ],
    links: [{ rel: "canonical", href: "/maruf" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Maruf Sultan",
        alternateName: "maruf009sultan",
        url: "https://github.com/maruf009sultan",
        image: "https://github.com/maruf009sultan.png",
        nationality: "Bangladeshi",
        sameAs: [
          "https://github.com/maruf009sultan",
          "https://github.com/maruf009sultan/awesome-russian-language",
        ],
        description: "Open-source maintainer, indie developer, and curator of awesome-russian-language — the most comprehensive community-curated directory of Russian-learning resources on GitHub.",
        knowsAbout: ["Open source", "Web development", "Bluetooth security", "Workflow automation", "Russian language resources"],
      }),
    }],
  }),
  component: MarufPage,
});

const PROJECTS = [
  { name: "awesome-russian-language", desc: "The dataset that powers Russify. Hundreds of curated Russian-learning resources, all CEFR-mapped.", url: "https://github.com/maruf009sultan/awesome-russian-language", stars: "★", tag: "Curation" },
  { name: "FLUCKY", desc: "Advanced Bluetooth HID attack platform for authorized red teams and security research.", url: "https://github.com/maruf009sultan/FLUCKY", stars: "22", tag: "Security" },
  { name: "n8n one-click", desc: "Effortlessly deploy n8n workflow automation with a single Docker command.", url: "https://github.com/maruf009sultan/n8n", stars: "14", tag: "DevOps" },
  { name: "MultiBots", desc: "Run multiple Telegram bots — public or private — in one isolated Docker container.", url: "https://github.com/maruf009sultan/MultiBots", stars: "12", tag: "Python" },
  { name: "Pomoflare", desc: "A modern Pomodoro app with flexible timer customization. React + Vite + TS.", url: "https://github.com/maruf009sultan/Pomoflare", stars: "12", tag: "Productivity" },
  { name: "AIELTS-WRITING", desc: "AI-powered IELTS writing grader with band scores, error highlights and feedback.", url: "https://github.com/maruf009sultan/AIELTS-WRITING", stars: "10", tag: "AI" },
  { name: "ESP32 FlashMate", desc: "ESP32 firmware backup & restore tool for Windows. Wraps esptool with one-command flows.", url: "https://github.com/maruf009sultan/esp32-flashmate", stars: "9", tag: "Embedded" },
  { name: "Solar Portfolio 3D", desc: "Interactive 3D solar-system portfolio site. TypeScript + Three.js.", url: "https://github.com/maruf009sultan/solar-portfolio-3d", stars: "11", tag: "Creative" },
];

function MarufPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="font-mono text-xs uppercase tracking-widest text-signal">§ The human behind the data</div>
        <h1 className="mt-2 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
          Meet <span className="text-signal">Maruf</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          He's not Russian. He's never lived in Russia. He probably can't roll his Р cleanly.
          And yet, he built the most comprehensive open-source directory of Russian-learning resources on the planet.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-8 border-2 border-ink bg-card p-6 brutal-shadow sm:grid-cols-[200px_1fr] sm:p-10 dark:border-cream"
      >
        <a
          href="https://github.com/maruf009sultan"
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square w-full overflow-hidden border-2 border-ink dark:border-cream"
          aria-label="Maruf Sultan on GitHub"
        >
          <img
            src="https://github.com/maruf009sultan.png"
            alt="Maruf Sultan — open-source maintainer of awesome-russian-language"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-signal/0 transition-colors group-hover:bg-signal/20" />
        </a>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-signal">@maruf009sultan</div>
          <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">Maruf Sultan</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            🇧🇩 Bangladesh · Indie developer · Open-source maintainer
          </p>
          <p className="mt-4 text-foreground/90">
            Maruf is a self-taught developer who treats GitHub like a notebook. Pomodoro timers,
            Bluetooth pen-test tools, ESP32 firmware utilities, AI grading apps, Telegram bot orchestrators —
            and one stubbornly thorough catalogue of Russian-learning resources.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="https://github.com/maruf009sultan" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-signal px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">
              <Github className="h-3.5 w-3.5" /> GitHub Profile
            </a>
            <a href="https://github.com/maruf009sultan?tab=followers" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">
              <Heart className="h-3.5 w-3.5" /> Follow
            </a>
            <a href="https://github.com/sponsors/maruf009sultan" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">
              <Coffee className="h-3.5 w-3.5" /> Sponsor
            </a>
          </div>
        </div>
      </motion.section>

      <section className="mt-20">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
          <Quote className="h-3 w-3" /> § The story
        </div>
        <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
          Why does a Bangladeshi dev build a Russian directory?
        </h2>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            <span className="float-left mr-3 mt-1 font-display text-7xl font-black leading-none text-signal">М</span>
            aruf doesn't remember exactly when it started. Maybe it was a YouTube rabbit-hole into a Soviet sci-fi
            film at 2am. Maybe it was Dostoevsky in clumsy English translation, the kind that makes you wonder
            what the original sounds like. Maybe it was just the alphabet — that strange, beautiful Cyrillic
            that looked like a code waiting to be cracked.
          </p>
          <p>
            What he <em>does</em> remember is the frustration. Every Russian-learning recommendation list online was
            either an SEO farm reciting "Top 10 Apps to Learn Russian (2017)" forever, or a single dusty Reddit thread
            buried under fifty newer ones asking the same question. Real, careful, opinionated, kept-fresh curation
            simply <strong>did not exist</strong> as a public good.
          </p>
          <p>
            So he started keeping notes. Then a markdown file. Then a GitHub repo. Then categories. Then CEFR tags.
            Then pricing flags. Then taglines. Then he stopped sleeping at reasonable hours.
          </p>
          <p className="border-l-4 border-signal bg-card px-6 py-4 italic text-foreground">
            "I'm not the right person to teach Russian. I'm the right person to <strong>find</strong> the right
            people who can. The internet is full of brilliant teachers, free courses, native podcasts, beautiful
            literature — they just need a librarian."
          </p>
          <p>
            That repo became <a href="https://github.com/maruf009sultan/awesome-russian-language" target="_blank" rel="noreferrer" className="font-bold underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">awesome-russian-language</a> —
            now the dataset that powers everything you see on Russify. <strong>{totalResources}+ resources. {categories.length} categories.
            One person, one keyboard, no funding, no agenda.</strong>
          </p>
          <p>
            He built it for the kid in Manila who wants to read Bulgakov. The retiree in São Paulo learning the
            language of her grandmother. The engineer in Lagos applying to Russian universities. The dreamer in
            Dhaka who fell down a Cyrillic rabbit hole at 2am — and never climbed out.
          </p>
          <p>
            Russify is just the storefront. <strong>Maruf is the library.</strong>
          </p>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
          <Code2 className="h-3 w-3" /> § Other things he's built
        </div>
        <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
          The notebook is full.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A sampler from his GitHub — security tooling, productivity apps, dev-ops one-clicks, AI experiments,
          embedded utilities. The man does not stop shipping.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              className="group relative flex flex-col border border-ink/15 bg-card p-5 transition-all hover:border-signal hover:brutal-shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-display text-lg font-bold tracking-tight group-hover:text-signal">{p.name}</div>
                <div className="flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-signal text-signal" /> {p.stars}
                </div>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-signal">{p.tag}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-signal">
                View on GitHub →
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="mt-20 border-2 border-ink bg-signal/10 p-8 brutal-shadow sm:p-12 dark:border-cream">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
          <Sparkles className="h-3 w-3" /> § Help him keep it alive
        </div>
        <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
          Contribute.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/90">
          One person curating hundreds of resources is a fragile thing. If you've found a great course, a
          podcast, a textbook, or a Telegram channel that belongs in the directory — <strong>send it</strong>.
          If you've found a dead link — <strong>flag it</strong>. If you've used Russify and it helped you —
          <strong> star the repo</strong>. None of this costs you money. All of it keeps the project breathing.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href="https://github.com/maruf009sultan/awesome-russian-language" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 bg-signal p-5 font-display font-bold text-cream transition-transform hover:-translate-y-0.5">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-80">Star the repo</div>
              <div className="mt-1 text-lg">It signals demand to keep going</div>
            </div>
            <Star className="h-6 w-6 transition-transform group-hover:scale-110" />
          </a>
          <a href="https://github.com/maruf009sultan/awesome-russian-language/fork" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border-2 border-ink bg-background p-5 font-display font-bold transition-transform hover:-translate-y-0.5 dark:border-cream">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Fork & PR</div>
              <div className="mt-1 text-lg">Add a resource you love</div>
            </div>
            <GitFork className="h-6 w-6 transition-transform group-hover:scale-110" />
          </a>
          <a href="https://github.com/maruf009sultan/awesome-russian-language/issues/new" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border-2 border-ink bg-background p-5 font-display font-bold transition-transform hover:-translate-y-0.5 dark:border-cream">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Open an issue</div>
              <div className="mt-1 text-lg">Suggest, report, request</div>
            </div>
            <Mail className="h-6 w-6 transition-transform group-hover:scale-110" />
          </a>
          <a href="https://github.com/sponsors/maruf009sultan" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border-2 border-ink bg-background p-5 font-display font-bold transition-transform hover:-translate-y-0.5 dark:border-cream">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Sponsor</div>
              <div className="mt-1 text-lg">Buy him hosting + coffee</div>
            </div>
            <Coffee className="h-6 w-6 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link to="/" className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-3 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 dark:border-cream">
          ← Back home
        </Link>
        <Link to="/credits" className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5">
          Project credits <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Спасибо, Маруф · Thank you, Maruf
      </p>
    </div>
  );
}
