"use client";

import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { AnimatedTooltipPreview } from "@/components/MyTechStack";
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";
import RecentProjects from "@/components/ui/RecentProjects";
import { myTechStacks } from "@/constants";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        {/* <FloatingNav navItems={navItems} /> */}
        <Hero />
        <Grid />
        <AnimatedTooltipPreview />
        <RecentProjects />
        {/*
        <Clients />
        <Experience />
        <Approach />
        <Footer /> */}
      </div>
    </main>
  );
};

export default Home;
