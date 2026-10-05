import Link from "next/link";

import type { Project } from "@/types/project";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="container-custom py-16 md:py-24">
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.2em] text-[#6f716d] transition hover:text-[#b8895b]"
          >
            ← Back to Projects
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                {project.category}
              </p>

              <h1 className="mt-5 text-5xl font-medium leading-tight md:text-7xl">
                {project.title}
              </h1>
            </div>

            <div>
              <p className="text-sm leading-7 text-[#6f716d]">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-8 border-t border-black/10 pt-5 text-xs uppercase tracking-[0.16em]">
                <div>
                  <span className="block text-[#6f716d]">
                    Category
                  </span>

                  <span className="mt-2 block">
                    {project.category}
                  </span>
                </div>

                <div>
                  <span className="block text-[#6f716d]">
                    Year
                  </span>

                  <span className="mt-2 block">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT IMAGE */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="overflow-hidden bg-black/5">
            <img
              src={project.image}
              alt={project.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="border-t border-black/10">
        <div className="container-custom grid gap-10 py-16 md:grid-cols-[0.7fr_1fr] md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
              Project Overview
            </p>
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-[#454844] md:text-2xl md:leading-10">
              {project.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}