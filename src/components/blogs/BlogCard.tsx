import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#b8895b]">
            {blog.author}
          </p>

          <h2 className="mt-3 text-2xl font-medium leading-tight transition-colors duration-300 group-hover:text-[#b8895b] md:text-3xl">
            {blog.title}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#6f716d]">
            {blog.excerpt}
          </p>

          <span className="mt-5 inline-block text-sm text-[#1c1c1c]">
            Read article →
          </span>
        </div>
      </Link>
    </article>
  );
}