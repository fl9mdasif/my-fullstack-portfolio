"use client";
import React from "react";
import {
  IconBulb,
  IconFiles,
  IconFileText,
  IconHome,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { FloatingNav } from "../ui/FloatingNav";

const NavBar = () => {
  // nav items
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <IconBulb className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <IconFiles className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blogs",
      link: "/blog",
      icon: (
        <IconFileText className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    // {
    //   name: "About",
    //   link: "#about",
    //   icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    // },

    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};
export default NavBar;
