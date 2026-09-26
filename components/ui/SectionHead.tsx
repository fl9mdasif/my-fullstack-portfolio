import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  /** Plain text, or text with an <span className="accent"> highlight. */
  title: ReactNode;
  /** One line. Keep it short — it sits under the headline. */
  lead?: string;
}) {
  return (
    <header className="sec-head">
      {eyebrow ? <span className="eyebrow reveal">{eyebrow}</span> : null}
      <h2 className="reveal">{title}</h2>
      {lead ? <p className="reveal">{lead}</p> : null}
    </header>
  );
}
