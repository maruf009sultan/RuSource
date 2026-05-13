import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header, Footer } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
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
      { title: `Russify — ${totalResources}+ Resources to Learn Russian` },
      { name: "description", content: "The most comprehensive curated directory of free & paid resources for learning Russian. From alphabet to C2 fluency." },
      { name: "author", content: "Russify" },
      { property: "og:title", content: `Russify — Learn Russian with ${totalResources}+ Curated Resources` },
      { property: "og:description", content: `Browse ${totalResources} hand-picked Russian learning resources across 31 categories. Search, filter by CEFR level, save favorites.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1a1620" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
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
