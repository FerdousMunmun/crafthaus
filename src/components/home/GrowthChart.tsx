"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const growthData = [
  {
    name: "Renovation",
    value: 35,
    color: "#b8895b",
  },
  {
    name: "Carpentry",
    value: 30,
    color: "#24302b",
  },
  {
    name: "Interior Design",
    value: 20,
    color: "#d8ad55",
  },
  {
    name: "Custom Furniture",
    value: 15,
    color: "#7189a6",
  },
];

export default function GrowthChart() {
  return (
    <section className="border-t border-[#dedbd4] bg-[#f8f7f4] pt-16 pb-24 text-[#24302b]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#b8895b]">
              OUR GROWTH
            </p>

            <h2 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-[#24302b] sm:text-5xl lg:text-6xl">
              Growing through
              <br />
              <span className="font-serif italic text-[#b8895b]">
                better spaces.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#6f716d]">
            Our growth is driven by the different ways we help clients
            create thoughtful, functional, and lasting spaces.
          </p>
        </div>

        {/* Chart */}
        <div className="grid items-center gap-12 border-t border-[#dedbd4] pt-12 md:grid-cols-[1fr_0.8fr]">
          <div className="relative h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={growthData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={135}
                  paddingAngle={3}
                  stroke="none"
                  animationDuration={1200}
                >
                  {growthData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dedbd4",
                    borderRadius: "8px",
                    color: "#24302b",
                  }}
                  formatter={(value) => [`${value}%`, "Growth"]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs tracking-[0.25em] text-[#6f716d]">
                  CRAFTHAUS
                </p>

                <p className="mt-2 text-3xl font-medium text-[#24302b]">
                  Growth
                </p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            {growthData.map((item) => (
              <div
                key={item.name}
                className="group flex items-center justify-between border-b border-[#dedbd4] pb-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-sm text-[#24302b] transition-colors group-hover:text-[#b8895b]">
                    {item.name}
                  </span>
                </div>

                <span className="text-lg font-medium text-[#24302b]">
                  {item.value}%
                </span>
              </div>
            ))}

            <div className="pt-4">
              <p className="text-xs leading-6 text-[#6f716d]">
                Growth distribution shown for presentation purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 flex items-center gap-3 text-xs tracking-[0.25em] text-[#6f716d]">
          <span className="h-px w-10 bg-[#b8895b]" />
          <span>BUILT WITH PURPOSE</span>
        </div>
      </div>
    </section>
  );
}