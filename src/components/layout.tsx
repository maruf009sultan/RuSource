import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Moon, Sun, Search, Menu, X, Sparkles, Zap, ZapOff } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useTheme } from "@/hooks/use-theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useState } from "react";
import { categories, totalResources } from "@/lib/resources";
import { RandomButton } from "@/components/random-button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/categories", label: "Categories" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/daily", label: "Daily" },
  { to: "/maruf", label: "Maruf" },
] as const;

export function Header() {
  const { favorites } = useFavorites();
  const { theme, toggle } = useTheme();
  const { reduced, toggle: toggleMotion } = useReducedMotion();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-background/80 backdrop-blur-md">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Russify home" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center bg-signal text-cream font-display text-xl font-black brutal-shadow-sm transition-transform group-hover:-translate-y-0.5" aria-hidden>
            Я
          </div>
          <div className="leading-none">
            <div className="font-display text-base font-black tracking-tight sm:text-lg">RUSSIFY</div>
            <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
              learn · russian
            </div>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-signal ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
                {active && <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-signal" aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <RandomButton />
          <Link
            to="/daily"
            aria-label="Resource of the day"
            title="Resource of the day"
            className="hidden h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal sm:flex"
          >
            <Sparkles className="h-4 w-4" />
          </Link>
          <Link
            to="/browse"
            aria-label="Search resources"
            className="hidden h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal sm:flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/favorites"
            aria-label={`Favorites${favorites.length ? ` (${favorites.length})` : ""}`}
            className="relative flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal"
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-signal px-1 font-mono text-[10px] font-bold text-cream">
                {favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMotion}
            aria-label={reduced ? "Enable animations" : "Reduce animations"}
            aria-pressed={reduced}
            title={reduced ? "Animations off" : "Reduce motion"}
            className="hidden h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal sm:flex"
          >
            {reduced ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          </button>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={theme === "dark"}
            className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center text-muted-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="animate-fade-in border-t border-ink/15 bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-3 text-sm font-medium last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-2 py-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <button onClick={toggleMotion} className="flex items-center gap-2 hover:text-signal">
                {reduced ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                {reduced ? "Motion off" : "Motion on"}
              </button>
              <button onClick={toggle} className="flex items-center gap-2 hover:text-signal">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center bg-signal text-cream font-display text-xl font-black" aria-hidden>
                Я
              </div>
              <div className="font-display text-lg font-black">RUSSIFY</div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The most comprehensive curated directory of free & paid resources for learning Russian. From А to Я.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/browse" className="hover:text-signal">Browse {totalResources} resources</Link></li>
              <li><Link to="/categories" className="hover:text-signal">{categories.length} categories</Link></li>
              <li><Link to="/roadmap" className="hover:text-signal">A1 → C2 roadmap</Link></li>
              <li><Link to="/daily" className="hover:text-signal">Resource of the day</Link></li>
              <li><Link to="/favorites" className="hover:text-signal">Your favorites</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest">Levels</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(["A1","A2","B1","B2","C1","C2"] as const).map((l) => (
                <li key={l}><Link to="/levels/$level" params={{ level: l }} className="hover:text-signal">Russian for {l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest">More</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-signal">About Russify</Link></li>
              <li><Link to="/maruf" className="hover:text-signal">About the creator</Link></li>
              <li><Link to="/credits" className="hover:text-signal">Credits</Link></li>
              <li><Link to="/faq" className="hover:text-signal">FAQ</Link></li>
              <li><Link to="/glossary" className="hover:text-signal">Glossary</Link></li>
              <li><Link to="/learn/$topic" params={{ topic: "free" }} className="hover:text-signal">Free Russian resources</Link></li>
              <li><Link to="/learn/$topic" params={{ topic: "podcasts" }} className="hover:text-signal">Best Russian podcasts</Link></li>
              <li>
                <a href="https://github.com/maruf009sultan/awesome-russian-language" className="hover:text-signal" target="_blank" rel="noreferrer">
                  Source on GitHub →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex-row">
          <div>© 2026 Russify · CC0 Resources</div>
          <div>
            Data curated by{" "}
            <a href="https://github.com/maruf009sultan" target="_blank" rel="noreferrer" className="text-foreground hover:text-signal">
              @maruf009sultan
            </a>
          </div>
          <div>Сделано с ❤ for global learners</div>
        </div>
      </div>
    </footer>
  );
}
