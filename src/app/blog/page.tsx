import { getBlogs } from "@/services/api";
import BlogCard from "@/components/blogs/BlogCard";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
              Journal / Ideas
            </p>

            <h1 className="text-5xl font-medium leading-tight md:text-7xl">
              Thoughts on
              <br />
              thoughtful spaces.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f716d]">
              Practical ideas, craftsmanship, materials, and inspiration from
              the world of renovation and interiors.
            </p>
          </div>

          {blogs.length === 0 ? (
            <p className="py-20 text-center text-[#6f716d]">
              No blog posts available yet.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}