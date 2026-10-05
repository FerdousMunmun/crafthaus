"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Service } from "@/types/service";

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({
  services,
}: ServicesClientProps) {
  return (
    <section
      id="services"
      className="section-padding bg-[#24302b] text-white"
    >
      <div className="container-custom">
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
            02 / What we do
          </p>

          <h2 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
            Built with intention.
            <br />
            Designed to last.
          </h2>
        </div>

        {services.length === 0 ? (
          <p className="py-20 text-center text-white/50">
            No services available yet.
          </p>
        ) : (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service, index) => (
              <motion.article
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group grid gap-6 py-8 md:grid-cols-[80px_1fr_auto] md:items-center"
              >
                <span className="text-sm text-[#b8895b]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Link
                  href={`/services/${service.slug}`}
                  className="block"
                >
                  <h3 className="text-2xl font-medium transition-colors duration-300 group-hover:text-[#b8895b] md:text-3xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                    {service.shortDescription}
                  </p>
                </Link>

                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/40 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#b8895b]"
                >
                  →
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}