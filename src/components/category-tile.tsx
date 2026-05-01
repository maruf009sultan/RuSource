import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Category } from "@/lib/resources";

export function CategoryTile({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Link
        to="/category/$slug"
        params={{ slug: category.slug }}
        className="group relative flex h-full flex-col justify-between border border-ink/15 bg-card p-5 transition-all hover:border-ink/40 hover:brutal-shadow-sm hover:-translate-y-0.5"
      >
        <div>
          <div className="flex items-start justify-between">
            <div className="text-3xl">{category.emoji}</div>
            <span className="font-mono text-xs font-bold text-signal">
              {String(category.resources.length).padStart(3, "0")}
            </span>
          </div>
          <h3 className="mt-3 font-display text-base font-bold leading-tight tracking-tight group-hover:text-signal">
            {category.name}
          </h3>
          {category.tagline && (
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{category.tagline}</p>
          )}
        </div>
        <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-signal">
          Explore →
        </div>
      </Link>
    </motion.div>
  );
}
