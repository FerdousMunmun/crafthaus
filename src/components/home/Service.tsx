"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Full Renovation",
    description:
      "Complete home transformations from structural changes to the final finish.",
  },
  {
    number: "02",
    title: "Custom Carpentry",
    description:
      "Built-in furniture, cabinetry and handcrafted details designed specifically for your space.",
  },
  {
    number: "03",
    title: "Interior Transformation",
    description:
      "Thoughtful material, lighting and finish selections that give every room its own character.",
  },
  {
    number: "04",
    title: "Space Planning",
    description:
      "Smarter layouts that make your home feel more open, functional and connected.",
  },
];

export default function Service() {
  return (
    <section
      id="services"
      className="bg-secondary py-28 text-white lg:py-36"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <div className="flex items-start gap-3">
            <span className="mt-2 h-px w-10 bg-primary" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              02 / What we do
            </span>
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Built around
              <span className="font-serif italic text-primary">
                {" "}
                your life.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/55">
              From the first idea to the final detail, we bring design and
              craftsmanship together to create spaces that work beautifully.
            </p>
          </div>
        </motion.div>

        {/* Services */}
        <div className="mt-20 border-t border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className="group grid gap-6 border-b border-white/10 py-9 transition-all duration-500 lg:grid-cols-[0.15fr_0.55fr_1fr_0.2fr] lg:items-center"
            >
              <span className="text-xs tracking-[0.2em] text-primary">
                {service.number}
              </span>

              <h3 className="text-2xl font-medium transition-transform duration-500 group-hover:translate-x-3 sm:text-3xl">
                {service.title}
              </h3>

              <p className="max-w-lg text-sm leading-6 text-white/45 transition-colors duration-300 group-hover:text-white/70">
                {service.description}
              </p>

              <Link
                href={`/services/${service.number}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg transition-all duration-300 group-hover:border-primary group-hover:bg-primary"
              >
                ↗
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            One team. One vision. Every detail considered.
          </p>

          <Link
            href="/services"
            className="group flex w-fit items-center gap-4 border-b border-white/20 pb-2 text-sm font-medium"
          >
            View all services
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}