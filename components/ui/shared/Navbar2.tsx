"use client";
import React from "react";
import {
  IconBulb,
  IconFiles,
  IconHome,
  IconLogin,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { FloatingNav } from "../FloatingNav";

const NavBar2 = () => {
  // nav items
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },

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
export default NavBar2;
