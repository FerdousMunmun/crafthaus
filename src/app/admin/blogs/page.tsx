import AdminBlogsClient from "@/components/admin/AdminBlogsClient";
import { getAdminBlogs } from "@/services/api";

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="container-custom py-12">
        <AdminBlogsClient
          blogCount={blogs.length}
        />

        <div className="mt-12 overflow-hidden border border-black/10">
          {blogs.length === 0 ? (
            <div className="p-12 text-center text-[#6f716d]">
              No blogs found.
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="grid gap-6 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[60px_180px_1fr_auto] md:items-center"
              >
                <span className="text-xs text-[#b8895b]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="h-28 overflow-hidden bg-black/5">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-medium">
                    {blog.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#6f716d]">
                    {blog.excerpt}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em]">
                    <span>{blog.author}</span>

                    <span
                      className={
                        blog.published
                          ? "text-green-700"
                          : "text-red-600"
                      }
                    >
                      {blog.published
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="border border-black/10 px-4 py-2 text-xs transition hover:bg-black/5"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="border border-red-200 px-4 py-2 text-xs text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}