import AdminBlogsClient from "@/components/admin/AdminBlogsClient";
import { getAdminBlogs } from "@/services/api";

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="container-custom py-12">
        <AdminBlogsClient
          blogCount={blogs.length}
          blogs={blogs}
        />
      </div>
    </main>
  );
}