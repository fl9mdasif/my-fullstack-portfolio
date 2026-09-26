"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/utils/cn";

type NavItem = {
  name: string;
  link: string;
  /** Home-page section this item tracks, if any. */
  section?: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Home", link: "/", section: "top" },
  { name: "Services", link: "/#services", section: "services" },
  { name: "Work", link: "/#work", section: "work" },
  { name: "Process", link: "/#process", section: "process" },
  { name: "Skills", link: "/#skills", section: "skills" },
  { name: "Projects", link: "/projects" },
  { name: "Blog", link: "/blog" },
];

/** Tracks which home-page section is currently in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (!enabled) return;

    const ids = NAV_ITEMS.map((i) => i.section).filter(
      (s): s is string => !!s && s !== "top"
    );
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);

    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The entry closest to the top third of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));

    const onScroll = () => {
      if (window.scrollY < 120) setActive("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return active;
}

function Monogram() {
  return (
    <span
      // className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-purple/30 bg-purple/10 font-semibold text-purple"
      // aria-hidden="true"
    >
     {/* MA
      <span className="absolute -bottom-px left-1/2 h-px w-5 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" /> */}
    </span>
  );
}

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(isHome);

  // Reading progress hairline under the rail.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on route change, on Escape, and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = useMemo(
    () => (item: NavItem) => {
      if (item.link === "/") return isHome && activeSection === "top";
      if (item.section) return isHome && activeSection === item.section;
      return pathname.startsWith(item.link);
    },
    [isHome, activeSection, pathname]
  );

  return (
    <header className="fixed inset-x-0 top-0 z-[5000]">
      <div
        className={cn(
          "mx-auto flex items-center gap-3 transition-all duration-500 ease-out",
          scrolled
            ? "mt-3 w-[min(1100px,calc(100%-1.5rem))] rounded-2xl border border-white/10 bg-black-100/80 px-3 py-2 shadow-[0_18px_50px_-30px_rgba(203,172,249,0.55)] backdrop-blur-xl"
            : "mt-0 w-full max-w-7xl rounded-none border border-transparent px-5 py-4 sm:px-10"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          <Monogram />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-white">
              Asif Al Azad
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white-200/70">
              Fullstack Engineer
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.name} className="relative">
                  <Link
                    href={item.link}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                      active ? "text-white" : "text-white-100/75 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-pill"}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-purple/30 bg-purple/10"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Availability + CTA */}
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white-200 xl:inline-flex">
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {!reduce && (
                <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400/70" />
              )}
            </span>
            Open to work
          </span>

          <Link
            href="/contact"
            className="relative hidden overflow-hidden rounded-full border border-purple/40 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-purple sm:inline-flex"
          >
            <span className="relative z-10">Hire me</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-purple/25 via-transparent to-cyan-400/25 opacity-0 transition-opacity duration-300 hover:opacity-100"
              aria-hidden="true"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-white transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-[1.5px] w-4 bg-white transition-opacity duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-white transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Reading progress — same violet-to-cyan ramp as the section accents. */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-purple via-violet-400 to-cyan-400"
        aria-hidden="true"
      />

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black-100/95 p-2 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium",
                      isActive(item)
                        ? "bg-purple/10 text-white"
                        : "text-white-100/80"
                    )}
                  >
                    {item.name}
                    <span className="font-mono text-[11px] text-white-200/50">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl border border-purple/40 bg-purple/10 px-4 py-3 text-[15px] font-semibold text-white"
            >
              Hire me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
