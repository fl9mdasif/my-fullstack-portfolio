import { CldImg } from "@/components/ui/CldImg";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import type { TTestimonial } from "@/types";

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="stars" role="img" aria-label={`Rated ${r} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={i < r ? undefined : "off"} />
      ))}
    </div>
  );
}

export function TestimonialCard({ t }: { t: TTestimonial }) {
  const byline = [t.clientRole, t.clientCompany].filter(Boolean).join(" · ");
  return (
    <figure className="testi">
      <div className="testi-top">
        <div className="quote-ico">
          <Icon name="quote" />
        </div>
        {t.rating ? <Stars rating={t.rating} /> : null}
      </div>
      <blockquote>
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="testi-by">
        <span className="av">
          {t.photo ? <CldImg src={t.photo} alt="" w={96} h={96} crop="thumb" gravity="face" sizes="38px" /> : null}
        </span>
        <div>
          <b>{t.clientName}</b>
          {byline && <span>{byline}</span>}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ items }: { items: TTestimonial[] }) {
  if (!items.length) return null;
  const sorted = [...items].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)).slice(0, 4);
  return (
    <section className="section flush-top" id="clients">
      <div className="wrap">
        <SectionHead eyebrow="What clients say" title="Feedback from people we've built for" />
        <div className="testi-grid" data-stagger>
          {sorted.map((t) => (
            <TestimonialCard key={t._id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
