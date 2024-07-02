"use client";
import { ProjectParallax } from "@/components/ui/ProjectParallax";
import NavBar2 from "@/components/ui/shared/Navbar2";
import { projects } from "@/constants";

import React from "react";

const Projects = () => {
  return (
    <div>
      <NavBar2 />
      <ProjectParallax products={projects} />
    </div>
  );
};
export default Projects;
