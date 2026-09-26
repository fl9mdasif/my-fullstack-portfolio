import Link from "next/link";
import { CldImg } from "@/components/ui/CldImg";
import { categoryName, cn } from "@/lib/utils";
import type { TPortfolioItem } from "@/types";

const GRADS = ["w1", "w2", "w3"];

export function WorkCard({ item, index }: { item: TPortfolioItem; index: number }) {
  const tag = categoryName(item.category);
  const hasImg = !!item.thumbnail;

  return (
    <Link href={`/work/${item.slug}`} className="work">
      <div className={cn("work-vis", GRADS[index % GRADS.length], hasImg && "has-img")}>
        {hasImg && (
          <CldImg
            src={item.thumbnail}
            alt=""
            w={720}
            h={450}
            sizes="(max-width: 620px) 100vw, (max-width: 940px) 50vw, 400px"
          />
        )}
        {tag && <span className="tag">{tag}</span>}
      </div>
      <div className="work-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.techStack?.length > 0 && (
          <div className="meta">
            {item.techStack.slice(0, 4).map((t) => (
              <i key={t}>{t}</i>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function WorkGrid({ items }: { items: TPortfolioItem[] }) {
  return (
    <div className="work-grid" data-stagger>
      {items.map((item, i) => (
        <WorkCard key={item._id} item={item} index={i} />
      ))}
    </div>
  );
}
