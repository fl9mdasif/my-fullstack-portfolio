/* eslint-disable @next/next/no-img-element */
"use client";
import { myTechStacks } from "@/constants";
import React from "react";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { Boxes } from "./ui/Boxes";

export function AnimatedTooltipPreview() {
  return (
    <div
      id="skills"
      className="h-[20rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased overflow-hidden"
    >
      <Boxes />

      <TextGenerateEffect
        words="MY SKILLS"
        className="text-center text-[40px] md:text-5xl lg:text-6xl"
      />

      <p className="uppercase tracking-widest text-xs text-center -mt-6 mb-5 text-blue-100 max-w-auto">
        I Have extends knowledge about these technologies
      </p>
      <div className="flex flex-wrap flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={myTechStacks} />
      </div>
    </div>
  );
}
