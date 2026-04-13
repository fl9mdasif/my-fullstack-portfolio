"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useAnimation,
  Variants,
} from "framer-motion";
import { FaLocationArrow, FaReact, FaBrain } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import { Button } from "./ui/MovingBorder";
import { Spotlight } from "./ui/Spotlight";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES: string[] = ["Full Stack Developer", "MERN Stack Expert", "AI / LLMs Interested"];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideTextVariants: Variants = {
  enter: { y: 30, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

const ringVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: (d: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: d, ease: "backOut" },
  }),
};

// ─── Rotating Ring Component (% of wrapper) ──────────────────────────────────
// Uses sizeRatio (0–1) relative to the parent wrapper so it scales on all screens

interface RingPercentProps {
  sizeRatio: number;   // fraction of the parent wrapper, e.g. 0.95
  delay: number;
  duration: number;
  color: string;
  label: string;
  icon: React.ReactNode;
  labelAngle?: number;
  reverse?: boolean;
}

const DecorativeRing: React.FC<RingPercentProps> = ({
  sizeRatio,
  delay,
  duration,
  color,
  label,
  icon,
  labelAngle = 45,
  reverse = false,
}) => {
  const rad = (labelAngle * Math.PI) / 180;
  // label position in % of ring diameter
  const lxPct = (50 + 50 * Math.cos(rad)).toFixed(2);
  const lyPct = (50 + 50 * Math.sin(rad)).toFixed(2);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      variants={ringVariants}
      custom={delay}
    >
      <motion.div
        className="rounded-full border border-dashed"
        style={{
          width: `${sizeRatio * 100}%`,
          height: `${sizeRatio * 100}%`,
          borderColor: color,
          boxShadow: `0 0 18px 2px ${color}55`,
          position: "relative",
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* Counter-rotate label so it stays upright */}
        <motion.div
          className="absolute"
          style={{
            left: `${lxPct}%`,
            top: `${lyPct}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md border whitespace-nowrap"
            style={{
              background: "rgba(6,9,31,0.85)",
              borderColor: color,
              color,
              boxShadow: `0 0 10px ${color}66`,
            }}
          >
            {icon}
            {label}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── Hero Component ────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const controls = useAnimation();

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    // -mx-5 sm:-mx-10 breaks out of page.tsx's px-5/sm:px-10 padding
    // so the background fills 100vw on every screen size
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Spotlights (same as original Hero) ─────────────────── */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* ── Grid background + radial fade (same as original Hero) ─ */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient gives faded-edge look */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* ── Content grid (re-adds the px cancelled by -mx above) ── */}
      <motion.div
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto px-5 sm:px-10 py-20 sm:py-28 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* ════════════════════════════════════════════════
            COLUMN 1 — TEXT  (order-2 on mobile so image
            appears above text on small screens)
        ════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 order-2 lg:order-1">

          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-4 py-1.5 text-xs font-medium tracking-widest text-purple uppercase backdrop-blur-sm">
              <HiSparkles className="text-yellow-300" />
              Hey, This is 👋
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-[70px] font-extrabold leading-tight tracking-tight"
          >
            <span className="text-white">Md&nbsp;</span>
            <span className="bg-gradient-to-r from-violet-400 via-purple to-cyan-400 bg-clip-text text-transparent">
              Asif Al Azad
            </span>
          </motion.h1>

          {/* Animated Role Slider */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl lg:text-3xl font-bold"
          >
            <span className="text-white-100">I&apos;m a</span>
            {/* min-w is capped so it never overflows on mobile */}
            <div className="relative h-[1.4em] overflow-hidden min-w-[280px] sm:min-w-[350px] lg:min-w-[450px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  variants={slideTextVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute left-0 top-0 text-purple bg-clip-text  whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-sm sm:text-base md:text-lg text-white-200 leading-relaxed max-w-[600px]"
          >
            I specialize in creating intuitive front-end designs and robust,
            powerful back-end systems to deliver complete web solutions.
            Transforming concepts into seamless user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mt-1"
          >
            <a href="/#recentProjects">
              <Button
                borderRadius="0.75rem"
                duration={3000}
                containerClassName="h-11 w-44 sm:h-12 sm:w-52"
                borderClassName="bg-[radial-gradient(#a78bfa_40%,transparent_60%)]"
                className="bg-slate-950 text-white text-sm font-semibold gap-2 flex items-center px-4"
              >
                <FaLocationArrow className="text-purple shrink-0" />
                Show My Work
              </Button>
            </a>

            <a
              href="https://drive.google.com/file/d/1W6ITHXW-LvLLawbHq4aPmAKViyP6zRSf/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                borderRadius="0.75rem"
                duration={2500}
                containerClassName="h-11 w-44 sm:h-12 sm:w-52"
                borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                className="bg-slate-950 text-white text-sm font-semibold gap-2 flex items-center px-4"
              >
                <span className="text-cyan-400 shrink-0">↓</span>
                Download CV
              </Button>
            </a>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════
            COLUMN 2 — VISUAL  (order-1 on mobile → top)
        ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "clamp(260px, 60vw, 400px)",
              height: "clamp(260px, 60vw, 400px)",
            }}
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, #a78bfa 0%, #38bdf8 50%, transparent 80%)",
              }}
            />

            {/* Ring 1 — outer ~95% of wrapper */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={ringVariants}
              custom={0.4}
              initial="hidden"
              animate={controls}
            >
              <DecorativeRing
                sizeRatio={0.95}
                delay={0.4}
                duration={38}
                color="#a78bfa"
                label="TS / MERN / NEXT"
                icon={<FaReact className="text-cyan-300 text-xs" />}
                labelAngle={-30}
              />
            </motion.div>

            {/* Ring 2 — inner ~78% of wrapper */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={ringVariants}
              custom={0.6}
              initial="hidden"
              animate={controls}
            >
              <DecorativeRing
                sizeRatio={0.78}
                delay={0.4}
                duration={42}
                color="#e796ab"
                label="Learning Docker"
                icon={<FaBrain className="text-purple text-xs" />}
                labelAngle={50}
                reverse
              />
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="relative z-10 rounded-full"
              style={{
                boxShadow: "0 0 40px rgba(167,139,250,0.4), 0 0 80px rgba(56,189,248,0.2)",
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Gradient border ring */}
              <div
                className="rounded-full p-[3px]"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #38bdf8, #a78bfa)",
                }}
              >
                {/*
                  Image container: 55vw on mobile capped at 200px,
                  then scales up to 240px on sm, 260px on lg
                */}
                <div
                  className="relative rounded-full bg-transparent overflow-hidden"
                  style={{
                    width: "clamp(160px, 48vw, 320px)",
                    height: "clamp(160px, 48vw, 320px)",
                  }}
                >
                  <Image
                    src="https://i.ibb.co/6RGr8y7d/blob.jpg"
                    alt="Md Asif Al Azad"
                    fill
                    className="object-fit"
                    style={{ background: "transparent" }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-green-500/40 bg-black-100/90 px-3 py-1.5 text-[11px] font-medium text-green-400 backdrop-blur-md whitespace-nowrap"
              style={{ boxShadow: "0 0 12px rgba(74,222,128,0.25)" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for opportunities
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
