import { createFileRoute } from "@tanstack/react-router";
import { categories, totalResources } from "@/lib/resources";
import { CategoryTile } from "@/components/category-tile";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All 31 Categories — Russify" },
      { name: "description", content: "All 31 categories of Russian learning resources, from alphabet to specialized topics." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="font-mono text-xs uppercase tracking-widest text-signal">§ Categories</div>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
        31 categories. {totalResources} resources.
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Pick a domain. Every category is hand-curated and labeled by CEFR level.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <CategoryTile key={c.slug} category={c} index={i} />
        ))}
      </div>
    </div>
  );
}
