/* eslint-disable @next/next/no-img-element */
"use client";
import { myTechStacksByCategory } from "@/constants";
import React from "react";
import { motion } from "framer-motion";
import { Boxes } from "./ui/Boxes";

export function Skills() {
  return (
    <div
      id="skills"
      className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      <Boxes />

      {/* Section header */}
      <div className="relative z-10 text-center mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3">What I work with</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Skills</span>
        </h2>
        <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Category rows */}
      <div className="relative z-10 w-full max-w-5xl space-y-6">
        {myTechStacksByCategory.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            {/* Category label */}
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider w-32 shrink-0">
              {group.category}
            </span>

            {/* Divider line */}
            <div className="hidden sm:block w-px h-8 bg-slate-700 shrink-0" />

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border bg-gradient-to-r ${group.color} backdrop-blur-sm cursor-default`}
                >
                  <img
                    src={item.iconURL}
                    alt={item.name}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs font-medium text-slate-200 whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}