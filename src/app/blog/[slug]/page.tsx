import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const blog: Blog = await response.json();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <article className="section-padding">
        <div className="container-custom">
          <Link
            href="/blog"
            className="mb-12 inline-block text-sm text-[#6f716d] transition-colors hover:text-[#b8895b]"
          >
            ← Back to Blogs
          </Link>

          <div className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
              {blog.author}
            </p>

            <h1 className="text-5xl font-medium leading-tight md:text-7xl">
              {blog.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 text-[#6f716d]">
              {blog.excerpt}
            </p>
          </div>

          <div className="relative mt-14 aspect-[16/8] overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="mt-14 max-w-3xl">
            <div className="whitespace-pre-line text-lg leading-9 text-[#343632]">
              {blog.content}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}