import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

/**
 * Global keyboard shortcuts for RuSource.
 * - `/` or `s` → focus the browse search input
 * - `Escape` → blur the active element (close menus/modals)
 * - `r` → random resource (daily resource page)
 * - `f` → go to favorites
 *
 * Shortcuts only fire when no input/textarea/select is focused,
 * so they don't interfere with typing.
 */
export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || tag === "select";

      // Escape always works - blur current element
      if (e.key === "Escape") {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        return;
      }

      // Don't fire shortcuts while typing in inputs
      if (isTyping) return;

      // `/` or `s` → focus search (navigate to browse + focus input)
      if (e.key === "/" || e.key === "s") {
        e.preventDefault();
        navigate({ to: "/browse" }).then(() => {
          // Small delay to let the browse page render
          setTimeout(() => {
            const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
            input?.focus();
          }, 100);
        });
        return;
      }

      // `r` → random / daily resource
      if (e.key === "r") {
        e.preventDefault();
        navigate({ to: "/daily" });
        return;
      }

      // `f` → favorites
      if (e.key === "f") {
        e.preventDefault();
        navigate({ to: "/favorites" });
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
}
