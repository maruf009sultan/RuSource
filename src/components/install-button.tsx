import { Download, X } from "lucide-react";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { useState, useEffect } from "react";

/**
 * Install button component for PWA.
 * Shows a floating install banner when the app is installable.
 * Dismisses for the current session when the user closes it.
 */
export function InstallButton() {
  const { isInstallable, isInstalled, promptInstall, dismiss } =
    useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state if the app becomes installable again
  useEffect(() => {
    if (isInstallable) setDismissed(false);
  }, [isInstallable]);

  if (isInstalled || !isInstallable || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    dismiss();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm animate-fade-in sm:left-auto sm:right-4">
      <div className="flex items-center gap-3 rounded-lg border border-ink/20 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-signal text-cream">
          <Download className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">Install RuSource</p>
          <p className="text-xs text-muted-foreground">
            Add to home screen for offline access
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={promptInstall}
            className="rounded-md bg-signal px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
