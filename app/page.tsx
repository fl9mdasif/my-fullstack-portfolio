"use client";

import Clients from "@/components/Clients";
import Education from "@/components/Education";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { Skills } from "@/components/MyTechStack";
import { Motion } from "@/components/motion/Motion";
import { Pipeline } from "@/components/sections/Pipeline";
import { ProjectStackSection } from "@/components/sections/ProjectStackSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

/**
 * Section order follows a visitor's questions, in the order they ask them:
 * who are you (Hero, Grid) -> what can you do for me (Services) -> prove it
 * (Work, Testimonials) -> how would we work (Process) -> can you actually
 * build it (Skills) -> background (Education) -> contact (Footer).
 */
const Home = () => {
  return (
    // No `overflow-hidden` here: it would silently break `position: sticky`
    // inside the project stack. `overflow-x-clip` keeps the vertical axis visible.
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-x-clip mx-auto">
      <div className="w-full">
        <Hero />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-10">
          <Grid />
        </div>

        <ServicesSection />

        {/* The deck sits outside every wrapper so no ancestor can break sticky. */}
        <ProjectStackSection />

       

        <Pipeline />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-10">
          <Skills />
          <Education />
      
        </div>
      
       <div className="max-w-7xl w-full mx-auto px-5 sm:px-10">
          <Clients />
        </div>
        
      </div>



      {/* Renders nothing; must stay last so its cleanup runs before React
          removes the DOM it animates. */}
      <Motion />
    </main>
  );
};

export default Home;
