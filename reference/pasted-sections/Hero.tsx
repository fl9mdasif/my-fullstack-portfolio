import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const LINES = ["We build the", "software your", "business"];
const GRAD_LINE = "actually needs";

const TERM = [
  ["web", "sites · e-commerce · platforms"],
  ["apps", "Android · iOS · cross-platform"],
  ["saas", "multi-tenant · billing · dashboards"],
  ["ai", "chatbots · RAG · automation"],
  ["stack", "Next.js · Node · Postgres · Python"],
  ["deploy", "CI/CD · monitored · documented"],
];

const chars = (text: string) =>
  text.split("").map((ch, i) => (
    <span key={i} className="char">
      {ch === " " ? " " : ch}
    </span>
  ));

export function Hero({ projects, specialists = 6 }: { projects: number; specialists?: number }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Software · AI · SaaS · Automation</span>
          <h1 id="hero-title" aria-label={`${LINES.join(" ")} ${GRAD_LINE}`}>
            {LINES.map((l) => (
              <span key={l} className="line" aria-hidden="true">
                {chars(l)}
              </span>
            ))}
            <span className="line" aria-hidden="true">
              <span className="grad char">{GRAD_LINE}</span>
            </span>
          </h1>
          <p className="hero-sub" data-fade>
            A Dhaka-based product and engineering team. Web platforms, e-commerce, mobile apps, custom SaaS and the
            automation that ties it together, delivered by one accountable team instead of three outsourced ones.
          </p>
          <div className="hero-cta" data-fade>
            <Link href="/contact" className="btn btn-solid">
              Start a project
              <Icon name="arrow" strokeWidth={2} />
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See our work
            </Link>
          </div>
          <div className="hero-meta" data-fade>
            <div>
              <b data-count={specialists}>{specialists}</b>
              <span>Specialists on team</span>
            </div>
            <div>
              <b data-count={projects}>{projects}</b>
              <span>Live projects shipped</span>
            </div>
            <div>
              <b>100%</b>
              <span>In-house, no outsourcing</span>
            </div>
          </div>
        </div>

        <div className="hero-panel" data-tilt aria-hidden="true">
          <div className="panel-bar">
            <i className="dot" />
            <i className="dot" />
            <i className="dot" />
            <span>{SITE.domain}</span>
          </div>
          <div className="term">
            <div>
              <span className="c">{"// what we ship"}</span>
            </div>
            {TERM.map(([k, v]) => (
              <div key={k}>
                <span className="k">{k}</span>: <span className="v">{v}</span>
              </div>
            ))}
          </div>
          <div className="float-stat">
            <span className="pulse" />
            <div>
              <small>Currently building</small>
              <b>Courier &amp; E-commerce SaaS</b>
            </div>
          </div>
          <div className="chips">
            {["Web", "E-commerce"].map((c) => (
              <span key={c} className="chip on">
                {c}
              </span>
            ))}
            {["App", "UI/UX", "SaaS", "Full stack", "AI chatbot", "Automation"].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
