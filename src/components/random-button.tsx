import { Dices } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getRandomResource } from "@/lib/discovery";

interface Props {
  variant?: "icon" | "pill";
  className?: string;
}

export function RandomButton({ variant = "icon", className = "" }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    const r = getRandomResource();
    // Navigate to the resource's category page anchored to the card — keeps users on Russify.
    navigate({
      to: "/category/$slug",
      params: { slug: r.categorySlug },
      hash: r.id,
    });
  };

  if (variant === "pill") {
    return (
      <button
        onClick={onClick}
        aria-label="Jump to a random Russian resource"
        className={`inline-flex items-center gap-2 border-2 border-ink bg-background px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 dark:border-cream ${className}`}
      >
        <Dices className="h-3.5 w-3.5" /> Random
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Jump to a random Russian resource"
      title="Random resource"
      className={`flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 ${className}`}
    >
      <Dices className="h-4 w-4" />
    </button>
  );
}
