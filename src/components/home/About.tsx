"use client";

import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import Link from "next/link";

const principles = [
  ["01", "Material", "Honest materials, chosen to age well."],
  ["02", "Space", "Layouts designed around real life."],
  ["03", "Light", "Natural light treated as a material."],
  ["04", "Detail", "Small decisions that change everything."],
];

const  revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#f8f7f4] py-28 lg:py-36"
    >
      <div className="container-custom">

        {/* Top Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"
        >
          {/* Label */}
          <motion.div variants={revealUp}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                01 / About the craft
              </span>
            </div>

            <p className="mt-8 max-w-[220px] text-sm leading-6 text-muted">
              Renovation is more than changing a room. It is about changing
              how that room becomes part of your everyday life.
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div variants={revealUp}>
            <h2 className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-secondary sm:text-5xl lg:text-7xl">
              We don't just renovate
              <span className="font-serif italic text-primary">
                {" "}
                houses.
              </span>
              <br />
              We rethink how they're lived in.
            </h2>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
              {/* Image reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group min-h-[420px] overflow-hidden"
              >
                <div
                  className="h-full min-h-[420px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85')",
                  }}
                />
              </motion.div>

              {/* Text */}
              <motion.div
                variants={revealUp}
                className="flex flex-col justify-between"
              >
                <div>
                  <p className="text-base leading-7 text-muted">
                    CraftHaus brings together renovation, carpentry and
                    interior thinking under one roof. Every decision is made
                    with purpose, from the first sketch to the final detail.
                  </p>

                  <p className="mt-6 text-base leading-7 text-muted">
                    We believe the best spaces don't need to shout. They
                    simply feel right.
                  </p>
                </div>

                <Link
                  href="#services"
                  className="group mt-10 flex w-fit items-center gap-4 border-b border-secondary/30 pb-3 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  Discover our approach

                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Principles */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid border-y border-secondary/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {principles.map(([number, title, description]) => (
            <motion.div
              key={number}
              variants={revealUp}
              className="group border-b border-secondary/10 px-5 py-7 transition-colors duration-300 hover:bg-secondary hover:text-white last:border-0 sm:border-r lg:border-b-0"
            >
              <span className="text-[10px] tracking-[0.25em] text-primary">
                {number}
              </span>

              <h3 className="mt-6 text-lg font-semibold text-secondary transition-colors duration-300 group-hover:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-white/60">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}