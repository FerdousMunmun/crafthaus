
"use client";
import Link from "next/link";
import { getAdminStats } from "@/services/api";
import { useEffect, useState } from "react";

export default  function AdminDashboard() {
 const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    blogs: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };

    loadStats();
  }, []);

  const dashboardItems = [
    {
      number: "01",
      title: "Services",
      count: stats.services,
      description: "Manage renovation and carpentry services.",
      href: "/admin/services",
    },
    {
      number: "02",
      title: "Projects",
      count: stats.projects,
      description: "Manage completed and featured projects.",
      href: "/admin/projects",
    },
    {
      number: "03",
      title: "Blogs",
      count: stats.blogs,
      description: "Create and manage material and quality articles.",
      href: "/admin/blogs",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <section className="border-b border-black/10 bg-[#24302b] text-white">
        <div className="container-custom py-16 md:py-20">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#b8895b]">
            CraftHaus / Admin
          </p>

          <h1 className="text-4xl font-medium leading-tight md:text-6xl">
            Control the craft.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            Manage your services, projects, and blogs content from one
            place.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-medium">
              Content overview
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-3">
            {dashboardItems.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group bg-[#f8f7f4] p-8 transition-colors duration-300 hover:bg-[#24302b] hover:text-white md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.15em] text-[#b8895b]">
                    {item.number}
                  </span>

                  <span className="text-4xl font-medium">
                    {item.count}
                  </span>
                </div>

                <h3 className="mt-14 text-3xl font-medium">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6f716d] transition-colors group-hover:text-white/50">
                  {item.description}
                </p>

                <span className="mt-8 inline-block text-sm text-[#b8895b]">
                  Manage →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}