"use client";

import { useMemo, useState } from "react";
import { WorkCard } from "./WorkCard";
import { categoryName } from "@/lib/utils";
import type { TPortfolioItem } from "@/types";

const ALL = "All";

export function WorkBrowser({ items }: { items: TPortfolioItem[] }) {
  const [active, setActive] = useState(ALL);

  const cats = useMemo(() => {
    const names = items.map((i) => categoryName(i.category)).filter((n): n is string => !!n);
    return [ALL, ...Array.from(new Set(names))];
  }, [items]);

  const shown = active === ALL ? items : items.filter((i) => categoryName(i.category) === active);

  return (
    <>
      {cats.length > 2 && (
        <div className="filter-row" role="group" aria-label="Filter projects by category" data-fade>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              className={c === active ? "chip on" : "chip"}
              aria-pressed={c === active}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {shown.length ? (
        <div className="work-grid" aria-live="polite">
          {shown.map((item, i) => (
            <WorkCard key={item._id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <p className="empty">No projects in this category yet.</p>
      )}
    </>
  );
}
