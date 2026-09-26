import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { href?: string; label: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb" data-fade>
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: "contents" }}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <span className="eyebrow" data-fade>
          {eyebrow}
        </span>
        <h1 data-fade>{title}</h1>
        {lead && <p data-fade>{lead}</p>}
        {children}
      </div>
    </section>
  );
}
