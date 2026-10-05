import AdminProjectsClient from "@/components/admin/AdminProjectsClient";
import { getAdminProjects } from "@/services/api";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="container-custom py-12">
        <AdminProjectsClient
          projectCount={projects.length}
          projects={projects}
        />
      </div>
    </main>
  );
}