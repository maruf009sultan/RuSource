import { useEffect, useRef } from "react";

/**
 * useAnimate — Replaces framer-motion entrance animations with CSS + IntersectionObserver.
 * Zero-JS runtime cost. Animations are defined in CSS (.ani / .ani-in classes).
 *
 * Usage:
 *   const ref = useAnimate();              // whileInView trigger
 *   const ref = useAnimate(true);          // animate on mount (hero elements)
 *   const ref = useAnimate(true, { y: 20, delay: 0.3, duration: 0.6 });
 *
 * Custom CSS vars via style prop:
 *   <div ref={ref} className="ani" style={{ '--ani-y': '20px', '--ani-delay': '0.3s' } as React.CSSProperties}>
 */

interface AnimateOpts {
  y?: number;     // translateY offset (default 16px)
  delay?: number; // animation delay in seconds
  duration?: number; // animation duration in seconds
  scale?: number; // scale from (default 1, no scale)
  fade?: boolean; // fade only, no y movement (default false)
}

// Global Intersection observer (reused across all elements)
let globalObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (globalObserver) return globalObserver;
  globalObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Add the triggered class
          const animType = el.dataset.aniType || "up";
          el.classList.add(animType === "fade" ? "ani-in-fade" : animType === "scale" ? "ani-in-scale" : "ani-in");
          globalObserver!.unobserve(el);
        }
      }
    },
    { threshold: 0, rootMargin: "-40px" }
  );
  return globalObserver;
}

export function useAnimate(onMount = false, opts: AnimateOpts = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set CSS custom properties from opts
    if (opts.y !== undefined) el.style.setProperty("--ani-y", `${opts.y}px`);
    if (opts.delay !== undefined) el.style.setProperty("--ani-delay", `${opts.delay}s`);
    if (opts.duration !== undefined) el.style.setProperty("--ani-dur", `${opts.duration}s`);
    if (opts.scale !== undefined) {
      el.style.setProperty("--ani-scale", `${opts.scale}`);
      el.dataset.aniType = "scale";
    }
    if (opts.fade) el.dataset.aniType = "fade";

    // Add base animation class
    el.classList.add("ani");

    if (onMount) {
      // Trigger immediately on mount (for hero/above-fold elements)
      // Use requestAnimationFrame to ensure the initial state (opacity:0) is painted first
      requestAnimationFrame(() => {
        const animType = el.dataset.aniType || "up";
        el.classList.add(animType === "fade" ? "ani-in-fade" : animType === "scale" ? "ani-in-scale" : "ani-in");
      });
    } else {
      // Observe for scroll-triggered animation
      getObserver().observe(el);
    }

    return () => {
      getObserver().unobserve(el);
    };
  }, [onMount, opts.y, opts.delay, opts.duration, opts.scale, opts.fade]);

  return ref;
}
