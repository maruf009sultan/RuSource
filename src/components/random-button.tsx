import { Dices } from "lucide-react";
import { toast } from "sonner";
import { getRandomResource } from "@/lib/discovery";

interface Props {
  variant?: "icon" | "pill";
  className?: string;
}

export function RandomButton({ variant = "icon", className = "" }: Props) {
  const onClick = () => {
    const r = getRandomResource();
    toast.success("Random pick!", {
      description: r.title,
      action: { label: "Open", onClick: () => window.open(r.url, "_blank", "noopener,noreferrer") },
    });
    window.open(r.url, "_blank", "noopener,noreferrer");
  };

  if (variant === "pill") {
    return (
      <button
        onClick={onClick}
        aria-label="Open a random Russian-learning resource"
        className={`inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 dark:border-cream ${className}`}
      >
        <Dices className="h-3.5 w-3.5" /> Random
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Open a random Russian-learning resource"
      title="Random resource"
      className={`flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 ${className}`}
    >
      <Dices className="h-4 w-4" />
    </button>
  );
}
