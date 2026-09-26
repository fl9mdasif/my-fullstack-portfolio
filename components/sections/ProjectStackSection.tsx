"use client";

import { useEffect } from "react";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { MOTION_REFRESH } from "@/components/motion/Motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectStack } from "@/components/sections/ProjectStack";
import { toPortfolioItem } from "@/utils/sections";
import type { TProject } from "@/types/common";

const StackSkeleton = () => (
  <ol className="stack-list">
    {[0, 1, 2].map((i) => (
      <li key={i} className="stack-item stack-skeleton" aria-hidden="true">
        <div className="stack-card">
          <div className="stack-body">
            <span className="sk sk-cat" />
            <span className="sk sk-title" />
            <span className="sk sk-tags" />
            <span className="sk sk-line" />
            <span className="sk sk-line short" />
          </div>
          <div className="stack-vis w1" />
        </div>
      </li>
    ))}
  </ol>
);

export function ProjectStackSection() {
  const { data, isLoading } = useGetAllProjectsQuery({});
  const items = ((data || []) as TProject[]).slice(0, 4).map(toPortfolioItem);

  // The skeleton nodes the motion layer bound to are gone once the real cards
  // render, so ask it to rebuild them.
  useEffect(() => {
    if (isLoading || !items.length) return;
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event(MOTION_REFRESH))
    );
    return () => cancelAnimationFrame(id);
  }, [isLoading, items.length]);

  return (
    <>
      <section className="section work-head" id="work">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            title={
              <>
                Projects I have <span className="accent">shipped</span>
              </>
            }
            lead="Scroll the deck — each card opens a case study with the problem, the stack and the result."
          />
        </div>
      </section>

      {/* The deck lives outside any wrapper so nothing can break position: sticky. */}
      {isLoading ? (
        <div className="stack">
          <StackSkeleton />
        </div>
      ) : (
        <ProjectStack items={items} />
      )}
    </>
  );
}
