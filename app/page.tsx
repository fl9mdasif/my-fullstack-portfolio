"use client";

import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { AnimatedTooltipPreview } from "@/components/MyTechStack";
import RecentProjects from "@/components/ui/RecentProjects";
import Footer from "@/components/ui/shared/Footer";
import NavBar from "@/components/ui/shared/Navbar";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <NavBar />
        <Hero />
        <Grid />
        <AnimatedTooltipPreview />
        <RecentProjects />
        {/*
        <Clients />
        <Experience />
        <Approach />
        */}
        <Footer />
      </div>
    </main>
  );
};

export default Home;
