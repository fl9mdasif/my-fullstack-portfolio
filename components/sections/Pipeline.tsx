import type { CSSProperties } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icon";

const STEPS = [
  { icon: "scope", t: "Scope", d: "We define what gets built and what does not, before any number is quoted." },
  { icon: "research", t: "Research", d: "Your users, your competitors, and the real constraints I have to design around." },
  { icon: "plan", t: "Plan", d: "Phases, milestones, and a timeline you can hold me to." },
  { icon: "architect", t: "Architect", d: "Data model, stack, and infra decided early. Scaling later is not a rewrite." },
  { icon: "context", t: "Design system", d: "Components and brand rules set once, so every screen stays consistent." },
  { icon: "fullstack", t: "Build", d: "Phase by phase on a staging URL you can open any day of the week." },
  { icon: "review", t: "Review", d: "Clean code, typed APIs, and a demo walkthrough with you at each phase." },
  { icon: "test", t: "Test & debug", d: "Real-device testing, edge cases, and load behaviour before your users find them." },
  { icon: "ship", t: "Ship", d: "Deployment, DNS, monitoring, backups, documentation. One clean handover." },
  { icon: "scale", t: "Scale", d: "Support, performance work, and the next iteration once real usage tells us more." },
];

// Keep these in sync with --acid and --violet in app/globals.css.
const ACID = [56, 189, 248];
const VIOLET = [203, 172, 249];

const accentAt = (i: number) => {
  const t = i / (STEPS.length - 1);
  const [r, g, b] = ACID.map((c, k) => Math.round(c + (VIOLET[k] - c) * t));
  return `rgb(${r} ${g} ${b})`;
};

export function Pipeline() {
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <SectionHead
          eyebrow="How I work"
          title={
            <>
              A process built to avoid <span className="accent">surprises</span>
            </>
          }
          lead="You see where the project stands at every stage — nothing is revealed for the first time at launch."
        />

        <div className="spine-wrap" id="spine">
          <div className="spine" aria-hidden="true">
            <i id="spine-fill" />
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => {
              const pct = Math.round(((i + 1) / STEPS.length) * 100);
              const n = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={s.t}
                  className={`step ${i % 2 === 0 ? "is-left" : "is-right"}`}
                  style={{ "--accent": accentAt(i), "--pct": `${pct}%` } as CSSProperties}
                >
                  <span className="step-stub" aria-hidden="true" />
                  <span className="step-node" aria-hidden="true" />
                  <div className="step-motion">
                    <article className="step-card" data-spot aria-labelledby={`step-${n}`}>
                      <div className="step-top">
                        <span className="step-num">{n}.</span>
                        <Icon name={s.icon} className="step-ico" strokeWidth={1.7} />
                      </div>
                      <h3 className="step-title" id={`step-${n}`}>
                        {s.t}
                      </h3>
                      <p className="step-desc">{s.d}</p>
                      <div className="step-bar-row">
                        <span className="step-bar" role="img" aria-label={`${pct}% of the way through`}>
                          <i />
                        </span>
                        <span className="step-pct" aria-hidden="true">
                          {pct}%
                        </span>
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
