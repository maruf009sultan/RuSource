import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { StarfieldBackground } from "@/components/starfield-background";
import { InstallButton } from "@/components/install-button";
import { totalResources } from "@/lib/resources";
import { FavoritesProvider } from "@/hooks/use-favorites";
import { RecentlyViewedProvider } from "@/hooks/use-recently-viewed";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { absUrl, GTM_ID } from "@/lib/seo";

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
      { title: `RuSource - ${totalResources}+ Resources to Learn Russian (Free & Paid, A1-C2)` },
      { name: "description", content: `The largest curated directory of Russian-language learning resources. ${totalResources}+ podcasts, courses, apps, books and tools, sorted by CEFR level. Free, open source, no signup.` },
      { name: "author", content: "Maruf Sultan (@maruf009sultan)" },
      { name: "keywords", content: "learn russian, russian resources, russian language, CEFR, A1 C2, russian courses, russian podcasts, free russian, learn russian online" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: `RuSource - Learn Russian with ${totalResources}+ Curated Resources` },
      { property: "og:description", content: `Browse ${totalResources}+ hand-picked Russian-learning resources across 30+ categories. Search, filter by CEFR level, save favorites. Free forever.` },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      { property: "og:site_name", content: "RuSource" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: absUrl("/og-image.png") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "RuSource - 749+ Curated Resources to Learn Russian" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `RuSource - Learn Russian, ${totalResources}+ Curated Resources` },
      { name: "twitter:description", content: "Hand-picked, CEFR-tagged, free forever." },
      { name: "twitter:image", content: absUrl("/og-image.png") },
      { name: "twitter:image:alt", content: "RuSource - 749+ Curated Resources to Learn Russian" },
      /* FIX: theme-color now matches manifest.json theme_color (#1a1620) */
      { name: "theme-color", content: "#1a1620" },
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "RuSource" },
    ],
    links: [
      { rel: "canonical", href: absUrl("/") },
      { rel: "alternate", hrefLang: "en", href: absUrl("/") },
      { rel: "alternate", hrefLang: "x-default", href: absUrl("/") },
      { rel: "alternate", type: "application/rss+xml", title: "RuSource - New Russian Learning Resources", href: absUrl("/feed.xml") },
      /* Preload critical fonts for instant text rendering */
      { rel: "preload", href: "/fonts/Inter-400.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/Unbounded-800.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/Unbounded-900.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      /* Preconnect to GTM domain (loads later but connection starts early) */
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "preconnect", href: "https://www.google-analytics.com" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#dc2626" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.json" },
    ],
    scripts: [
      /* GTM — Standard Google Tag Manager snippet placed as high in the <head> as possible.
         CSP hash: sha256-6aXQ3lEuWklrxjUW3X5ZaKl1/UL5eEE2RbJbVnKlZJY= (update after any change to this script content) */
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "RuSource",
              alternateName: "Learn Russian Directory",
              url: absUrl("/"),
              description: "Curated directory of resources for learning the Russian language.",
              inLanguage: ["en", "ru"],
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: absUrl("/browse?q={search_term_string}") },
                "query-input": "required name=search_term_string",
                "action-status": "PotentialActionStatus",
              },
            },
            {
              "@type": "Organization",
              name: "RuSource",
              url: absUrl("/"),
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
        {/* GTM noscript fallback — placed immediately after opening <body> tag */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif", textAlign: "center", color: "#e8e0d0", background: "#1a1620", minHeight: "100vh" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>RuSource</h1>
            <p style={{ marginTop: "1rem", color: "#a8a0b0" }}>This app requires JavaScript to run. Please enable JavaScript in your browser settings.</p>
            <p style={{ marginTop: "0.5rem", color: "#a8a0b0" }}>RuSource is a curated directory of 749+ resources for learning Russian.</p>
          </div>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Register service worker for offline support — deferred to idle
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(register);
      } else {
        setTimeout(register, 1000);
      }
    }
  }, []);

  // Register global keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <FavoritesProvider>
      <RecentlyViewedProvider>
        <div className="relative flex min-h-screen flex-col">
          <StarfieldBackground />
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <InstallButton />
          <Toaster position="bottom-right" theme="dark" richColors closeButton />
        </div>
      </RecentlyViewedProvider>
    </FavoritesProvider>
  );
}

function ScrollProgress() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-live="polite"
    >
      <div
        id="scroll-progress-bar"
        className="h-full origin-left bg-signal"
        style={{ transform: "scaleX(0)" }}
        ref={(el) => {
          if (!el || typeof window === "undefined") return;
          const wrapper = el.parentElement;
          // requestAnimationFrame batching to avoid forced reflows
          let ticking = false;
          const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
              const h = document.documentElement;
              const max = h.scrollHeight - h.clientHeight;
              const r = max > 0 ? h.scrollTop / max : 0;
              el.style.transform = `scaleX(${r})`;
              if (wrapper) wrapper.setAttribute("aria-valuenow", String(Math.round(r * 100)));
              ticking = false;
            });
          };
          window.addEventListener("scroll", onScroll, { passive: true });
        }}
      />
    </div>
  );
}
