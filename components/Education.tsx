"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBookOpen } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSES = [
    {
        title: "Complete Web Development (MERN)",
        org: "Programming Hero",
        status: "Completed",
        certificaateLink: "https://i.ibb.co/2dVhHJN/PG-hero.png"
    },
    {
        title: "Next Level Web Development",
        org: "Programming Hero",
        status: "Completed",
        certificaateLink: "https://web.programming-hero.com/verification?validationNumber=PHlevel2-batch2-fullstackL2B2-04121040"
    },


];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeLeft = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const lineReveal = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "100%", opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Education: React.FC = () => {
    return (
        <section id="education" className="py-20 relative w-full overflow-hidden">
            <div className="flex flex-col items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-4 py-1.5 text-xs font-medium tracking-widest text-purple uppercase mb-4"
                >
                    <HiSparkles className="text-yellow-300" />
                    Academic Journey
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-5xl font-bold text-center"
                >
                    Education & <span className="text-purple">Certifications</span>
                </motion.h2>
            </div>

            <div className="relative max-w-6xl mx-auto px-5">
                {/* Middle Line Divider (Hidden on small screens) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
                    <motion.div
                        variants={lineReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full h-full bg-gradient-to-b from-purple via-cyan-400 to-transparent shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                    />
                    {/* Animated Dots on the line */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple shadow-[0_0_10px_purple] z-10" />
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] z-10" />
                </div>

                {/* ── Desktop/Mobile Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

                    {/* LEFT: EDUCATION */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-6 lg:text-right"
                    >
                        <div className="flex flex-col lg:items-end gap-3 group">
                            <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center border border-purple/30 group-hover:scale-110 transition-transform lg:order-last">
                                <FaGraduationCap className="text-purple text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple transition-colors">
                                    B.Sc. Eng. in Computer Science & Engineering
                                </h3>
                                <p className="text-purple font-medium text-lg mt-1 italic">
                                    Bangladesh University of Business & Technology
                                </p>
                                <div className="mt-4 flex flex-col lg:items-end space-y-2">
                                    <span className="bg-slate-900 border border-white/10 px-3 py-1 rounded-md text-sm text-white-100 w-fit">
                                        06.2021 – 12.2025
                                    </span>
                                    <p className="text-white-200 leading-relaxed max-w-md">
                                        Focused on Software Engineering, Data Structures, Algorithms, and Full-Stack Development.
                                        Maintaining excellence with <span className="text-cyan-400 font-semibold">First Class</span> honors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: COURSES */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
                                <FaBookOpen className="text-cyan-400 text-2xl" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                                Key Courseworks
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {COURSES.map((course, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 10 }}
                                    className="p-4 rounded-xl border border-white/10 bg-black-200/50 backdrop-blur-sm hover:border-cyan-400/40 transition-all group shadow-lg"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {course.title}
                                            </h4>
                                            <p className="text-sm text-white-200 mt-1">{course.org}</p>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-purple/20 text-purple border border-purple/30 shrink-0">
                                            {course.status}
                                        </span>
                                        <a className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 shrink-0" href={course.certificaateLink}>verify</a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Education;
