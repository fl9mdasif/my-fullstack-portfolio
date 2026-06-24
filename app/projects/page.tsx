"use client";
import { ProjectParallax } from "@/components/ui/ProjectParallax";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import React from "react";

const Projects = () => {
  const { data: projectsData, refetch, isLoading } = useGetAllProjectsQuery({});

  const projectsList = projectsData || [];
  // console.log("projects data", projectsData);
  // console.log("fetch project", projectsList);

  return (
    <div className="bg-[#06091f] min-h-screen">
      <ProjectParallax isLoading={isLoading} projectsList={projectsList} />
    </div>
  );
};

export default Projects;
