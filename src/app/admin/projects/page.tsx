import AdminProjectsClient from "@/components/admin/AdminProjectsClient";
import { getAdminProjects } from "@/services/api";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="border-b border-black/10">
        <div className="container-custom py-12">
          <AdminProjectsClient
            projectCount={projects.length}
          />
        </div>
      </div>

      <section className="section-padding pt-12">
        <div className="container-custom">
          <div className="overflow-hidden border border-black/10">
            {projects.length === 0 ? (
              <div className="p-12 text-center text-[#6f716d]">
                No projects found.
              </div>
            ) : (
              projects.map((project, index) => (
                <div
                  key={project._id}
                  className="grid gap-6 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[60px_180px_1fr_auto] md:items-center"
                >
                  <span className="text-xs text-[#b8895b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="h-28 overflow-hidden bg-black/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-medium">
                      {project.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#6f716d]">
                      {project.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em]">
                      <span>{project.category}</span>

                      <span>{project.year}</span>

                      <span
                        className={
                          project.published
                            ? "text-green-700"
                            : "text-red-600"
                        }
                      >
                        {project.published
                          ? "Published"
                          : "Unpublished"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="border border-black/10 px-4 py-2 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="border border-red-200 px-4 py-2 text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}