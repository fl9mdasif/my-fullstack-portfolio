/* eslint-disable @next/next/no-img-element */
"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./PinCard";
import Link from "next/link";
import MagicButton from "./MagicButton";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { TProject } from "@/types/common";
import { getTechStackIcons, cleanDescription } from "@/utils/techStackMatcher";
import LoadingSpinner from "../shared/loading";

const RecentProjects = () => {
  const { data: projectsData, refetch, isLoading } = useGetAllProjectsQuery({});

  const projectsList = projectsData?.data || [];
  return (
    <div id="recentProjects" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      {isLoading && <LoadingSpinner />}

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projectsList.map((project: TProject) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={project._id || project.title}
          >
            <PinContainer
              title={project.title}
              href={`/projects/${project._id}`}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  {/* <img src="/bg.png" alt="bgimg" /> */}

                  <img
                    src={project.image || "/bg.png"}
                    alt="cover"
                    className="z-10 object-cover h-full w-full absolute bottom-0"
                  />
                </div>
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {project.title}
              </h1>

              <p
                className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {cleanDescription(project.description)}
              </p>

              <div className="flex flex-col items-start justify-center mt-7 mb-3">
                <div className="flex flex-wrap gap-2">
                  {getTechStackIcons(project.technologies).map(
                    (tech, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center gap-0"
                        title={tech.name}
                      >
                        <img
                          src={tech.iconURL}
                          alt={tech.name}
                          className="w-4 h-4 lg:w-7 lg:h-7 object-contain"
                        />
                      </div>
                    ),
                  )}
                  {/* Show technologies without icons as plain text */}
                  {project.technologies
                    .filter((tech) => !getTechStackIcons([tech]).length)
                    .map((tech, index) => (
                      <span
                        key={`text-${index}`}
                        className="border border-white/[.2] rounded-full bg-black lg:px-3 lg:py-1 px-2 py-1 text-xs lg:text-sm flex justify-center items-center"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                <div className="flex justify-between   mt-3">
                  <p className="flex  mr-5 items-center lg:text-lg md:text-xs text-sm text-purple">
                    <Link
                      href={`/projects/${project._id}`}
                      className="pt-3 block group-hover/product:shadow-2xl "
                    >
                      View Project Details
                    </Link>

                    <FaLocationArrow className="ml-1" color="#CBACF9" />
                  </p>
                </div>
              </div>
            </PinContainer>
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
