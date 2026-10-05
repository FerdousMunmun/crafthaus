import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  published: boolean;
  createdAt: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const service: Service = await response.json();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <section className="section-padding">
        <div className="container-custom">
          <Link
            href="/#services"
            className="mb-12 inline-block text-sm text-[#6f716d] hover:text-[#b8895b]"
          >
            ← Back to services
          </Link>

          <div className="mb-12">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
              {service.icon}
            </p>

            <h1 className="text-5xl font-medium leading-tight md:text-7xl">
              {service.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 text-[#6f716d]">
              {service.shortDescription}
            </p>
          </div>

          <div className="relative aspect-[16/8] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="mt-12 max-w-3xl border-t border-black/10 pt-10">
            <p className="text-lg leading-8 text-[#343632]">
              {service.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}