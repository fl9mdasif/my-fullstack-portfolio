"use client";
import { ProjectParallax } from "@/components/ui/ProjectParallax";
import NavBar2 from "@/components/shared/Navbar2";
import { projects } from "@/constants";
import Footer from "@/components/shared/Footer";

import React from "react";

const Projects = () => {
  return (
    <div>
      <NavBar2 />
      <ProjectParallax products={projects} />
      <Footer />
    </div>
  );
};
export default Projects;
