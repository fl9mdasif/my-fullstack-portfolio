"use client";

import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { AnimatedTooltipPreview } from "@/components/MyTechStack";
import RecentProjects from "@/components/ui/RecentProjects";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div className="w-full">
        <Hero />
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-10">
          <Grid />
          <AnimatedTooltipPreview />
          <RecentProjects />
          <Clients />
          <Approach />
        </div>
      </div>
    </main>
  );
};

export default Home;
