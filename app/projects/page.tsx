"use client";
import { ProjectParallax } from "@/components/ui/ProjectParallax";
import NavBar from "@/components/shared/Navbar";
import { projects } from "@/constants";
import Footer from "@/components/shared/Footer";

import React from "react";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import LoadingSpinner from "@/components/shared/loading";

const Projects = () => {
  const { data: projectsData, refetch, isLoading } = useGetAllProjectsQuery({});

  const projectsList = projectsData?.data || [];
  // console.log("dummy data", projects);
  // console.log("fetch project", projectsList);

  return (
    <div>
      <NavBar />
      <ProjectParallax isLoading={isLoading} projectsList={projectsList} />
    </div>
  );
};

export default Projects;
