import type { CSSProperties } from "react";
import Link from "next/link";
import { CldImg } from "@/components/ui/CldImg";
import { Icon } from "@/components/ui/Icon";
import { categoryName } from "@/utils/sections";
import type { TPortfolioItem } from "@/types/sections";

const GRADS = ["w1", "w2", "w3"];
const ACCENTS = ["var(--violet)", "var(--acid)", "var(--acid)"];

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectStack({ items }: { items: TPortfolioItem[] }) {
  if (!items.length) return null;

  return (
    <div className="stack" id="stack">
      <ol className="stack-list">
        {items.map((item, i) => {
          const cat = categoryName(item.category);
          return (
            <li
              key={item._id}
              className="stack-item"
              style={{ "--i": i, "--accent": ACCENTS[i % ACCENTS.length] } as CSSProperties}
            >
              {/* 2 x 2 grid: narrow info column + wide image on the top row,
                  one thin full-width description row underneath. */}
              <article className="stack-card" data-spot aria-labelledby={`stack-${item.slug}`}>
                <div className="stack-body">
                  <span className="stack-cat">
                    {pad(i + 1)}
                    {cat ? ` · ${cat}` : ""}
                  </span>
                  <h3 className="stack-title" id={`stack-${item.slug}`}>
                    {item.title}
                  </h3>
                  {item.techStack?.length > 0 && (
                    <ul className="stack-tags" aria-label="Tech stack">
                      {item.techStack.slice(0, 5).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <Link href={`/projects/${item.slug}`} className="stack-link">
                    View case study
                    <Icon name="arrow" strokeWidth={2} />
                  </Link>
                </div>

                <div className={`stack-vis ${GRADS[i % GRADS.length]}`} aria-hidden="true">
                  <div className="stack-vis-inner">
                    {item.thumbnail ? (
                      <CldImg
                        src={item.thumbnail}
                        alt=""
                        w={1600}
                        h={1000}
                        sizes="(max-width: 767px) 100vw, 840px"
                      />
                    ) : null}
                  </div>
                </div>

                <p className="stack-desc">{item.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
      <div className="stack-counter" aria-hidden="true">
        <b id="stack-cur">01</b>
        <span>/ {pad(items.length)}</span>
      </div>
    </div>
  );
}
