/* eslint-disable @next/next/no-img-element */

"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Link from "next/link";
import MagicButton from "./MagicButton";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { TProject } from "@/types/common";
import { getTechStackIcons, cleanDescription } from "@/utils/techStackMatcher";

// Skeleton Card Component
const ProjectSkeleton = () => (
  <div className="lg:min-h-[38rem] h-[33rem] flex items-center justify-center sm:w-96 w-[80vw] mb-20">
    <div className="w-full animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[20vh] lg:h-[30vh] mb-10 rounded-3xl bg-white/10" />
      
      {/* Title skeleton */}
      <div className="h-6 bg-white/10 rounded-md w-3/4 mb-3" />
      
      {/* Description skeleton */}
      <div className="h-4 bg-white/10 rounded-md w-full mb-2" />
      <div className="h-4 bg-white/10 rounded-md w-2/3 mb-7" />
      
      {/* Tech icons skeleton */}
      <div className="flex gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10" />
        ))}
      </div>
      
      {/* Link skeleton */}
      <div className="h-4 bg-white/10 rounded-md w-1/3" />
    </div>
  </div>
);

const RecentProjects = () => {
  const { data: projectsData, isLoading } = useGetAllProjectsQuery({});

  const projectsList = (projectsData || []).slice(-4);

  return (
    <div id="recentProjects" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center pt-4 gap-16 mt-10 pb-5">
        
        {/* Loading Skeleton  */}
        {isLoading
          ? [...Array(3)].map((_, i) => <ProjectSkeleton key={i} />)
          : projectsList.map((project: TProject) => (
             <div className="flex items-start justify-center sm:w-96 w-[80vw]"
                key={project._id || project.title}
                >
                <div>
                  <Link
                    href={`/projects/${project._id}`}
                    className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-"
                  >
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img
                        src={project.image || "/bg.png"}
                        alt="cover"
                        className="z-10 object-cover h-full w-full absolute bottom-0"
                      />
                    </div>
                  </Link>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {project.title}
                  </h1>

                  <p
                    className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2"
                    style={{ color: "#BEC1DD", margin: "1vh 0" }}
                  >
                    {cleanDescription(project.description)}
                  </p>

                  <div className="flex flex-col items-start justify-center mt-7 mb-3">
                    <div className="flex flex-wrap gap-2 items-start min-h-[50px] md:min-h-[80px] lg:min-h-[90px] w-full">
                      {getTechStackIcons(project.technologies).map((tech, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] bg-white rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center"
                          title={tech.name}
                        >
                          <img
                            src={tech.iconURL}
                            alt={tech.name}
                            className="w-4 h-4 lg:w-7 lg:h-7 object-contain"
                          />
                        </div>
                      ))}
                      {project.technologies
                        .filter((tech) => !getTechStackIcons([tech]).length)
                        .map((tech, index) => (
                          <span
                            key={`text-${index}`}
                            className="border border-white/[.2] rounded-full lg:px-3 lg:py-1 px-2 py-1 text-xs lg:text-sm flex justify-center items-center text-white"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="flex mr-5 items-center lg:text-lg md:text-xs text-sm text-purple">
                        <Link href={`/projects/${project._id}`} className="pt-3 block">
                          View Project Details
                        </Link>
                        <FaLocationArrow className="ml-1" color="#CBACF9" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center m-5 items-center gap-4">
        <Link href="/projects">
          <MagicButton
            title="View All Projects"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;