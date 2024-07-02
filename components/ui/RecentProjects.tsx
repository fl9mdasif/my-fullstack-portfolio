/* eslint-disable @next/next/no-img-element */
"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { IoCodeSlash } from "react-icons/io5";

import { projects } from "@/data";
import { PinContainer } from "./PinCard";
import Link from "next/link";
import MagicButton from "./MagicButton";
import { IconCode } from "@tabler/icons-react";

const RecentProjects = () => {
  return (
    <div id="recentProjects" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item: any) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="/ui.aceternity.com"
              href="https://twitter.com/mannupaaji"
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex flex-col items-start justify-center mt-7 mb-3">
                <div className="flex ">
                  {item.iconLists.map((icon: any, index: any) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between   mt-3">
                  <p className="flex mr-5  items-center lg:text-lg md:text-xs text-sm text-purple">
                    <a href={item.link}>client</a>
                    <IoCodeSlash className="ml-1" color="#CBACF9" />
                  </p>
                  <p className="flex  mr-5 items-center lg:text-lg md:text-xs text-sm text-purple">
                    <a href={item.link}>server</a>
                    <IoCodeSlash className="ml-1" color="#CBACF9" />
                  </p>
                  <p className="flex  mr-5 items-center lg:text-lg md:text-xs text-sm text-purple">
                    <a href={item.link}>Live Site</a>
                    <FaLocationArrow className="ml-1" color="#CBACF9" />
                  </p>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-5 items-center gap-4">
        <Link href="/projects" download>
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
