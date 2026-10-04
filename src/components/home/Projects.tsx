"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/types/project";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({
  projects,
}: ProjectsClientProps) {
  return (
    <section
      id="projects"
      className="section-padding bg-[#f8f7f4]"
    >
      <div className="container-custom">

        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
              03 / Selected work
            </p>

            <h2 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
              Spaces shaped around
              <span className="text-[#b8895b]"> real life.</span>
            </h2>
          </div>

          <p className="hidden max-w-sm text-sm leading-6 text-[#6f716d] md:block">
            A selection of renovation and interior projects where
            architecture, material and everyday living meet.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="py-20 text-center text-[#6f716d]">
            No projects available yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">

            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 p-5 text-white backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-[0.15em]">
                      {project.category}
                    </span>

                    <span className="text-xs">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-medium">
                    {project.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#6f716d]">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}