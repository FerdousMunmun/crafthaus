import { notFound } from "next/navigation";

import ProjectDetails from "@/components/projects/ProjectDetails";
import { getProjectBySlug } from "@/services/api";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  try {
    const project = await getProjectBySlug(slug);

    if (!project) {
      notFound();
    }

    return <ProjectDetails project={project} />;
  } catch (error) {
    console.error(error);

    notFound();
  }
}