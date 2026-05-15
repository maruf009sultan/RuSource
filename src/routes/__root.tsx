import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header, Footer } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { StarfieldBackground } from "@/components/starfield-background";
import { totalResources } from "@/lib/resources";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-signal">Error · 404</div>
        <h1 className="mt-3 font-display text-7xl font-black tracking-tight">Не найдено</h1>
        <h2 className="mt-2 text-xl font-semibold">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has wandered off into the steppe.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-cream brutal-shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `Russify — ${totalResources}+ Resources to Learn Russian (Free & Paid, A1–C2)` },
      { name: "description", content: `The largest curated directory of Russian-language learning resources. ${totalResources}+ podcasts, courses, apps, books and tools, sorted by CEFR level. Free, open source, no signup.` },
      { name: "keywords", content: "learn russian, russian language, russian resources, russian course, russian podcast, russian app, cyrillic alphabet, russian for beginners, A1 russian, B1 russian, C1 russian, free russian lessons, awesome russian language" },
      { name: "author", content: "Maruf Sultan (@maruf009sultan)" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: `Russify — Learn Russian with ${totalResources}+ Curated Resources` },
      { property: "og:description", content: `Browse ${totalResources}+ hand-picked Russian-learning resources across 30+ categories. Search, filter by CEFR level, save favorites. Free forever.` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Russify" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ru_RU" },
      { property: "og:image", content: "https://github.com/maruf009sultan.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Russify — Learn Russian, ${totalResources}+ Curated Resources` },
      { name: "twitter:description", content: "Hand-picked, CEFR-tagged, free forever." },
      { name: "twitter:image", content: "https://github.com/maruf009sultan.png" },
      { name: "theme-color", content: "#1a1620" },
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Russify" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23dc2626'/%3E%3Ctext x='50' y='72' font-family='serif' font-size='70' font-weight='900' text-anchor='middle' fill='%23faf3e0'%3EЯ%3C/text%3E%3C/svg%3E" },
      { rel: "preconnect", href: "https://github.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Russify",
              alternateName: "Learn Russian Directory",
              description: "Curated directory of resources for learning the Russian language.",
              inLanguage: ["en", "ru"],
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: "/browse?q={search_term_string}" },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Organization",
              name: "Russify",
              founder: { "@type": "Person", name: "Maruf Sultan", url: "https://github.com/maruf009sultan" },
              sameAs: ["https://github.com/maruf009sultan/awesome-russian-language", "https://github.com/maruf009sultan"],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <StarfieldBackground />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </div>
  );
}

function ScrollProgress() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        id="scroll-progress-bar"
        className="h-full origin-left scale-x-0 bg-signal transition-transform duration-75"
        style={{ transform: "scaleX(0)" }}
        ref={(el) => {
          if (!el || typeof window === "undefined") return;
          const onScroll = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const r = max > 0 ? h.scrollTop / max : 0;
            el.style.transform = `scaleX(${r})`;
          };
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        }}
      />
    </div>
  );
}
