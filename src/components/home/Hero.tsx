import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f7f4] pt-20">
      <div className="container-custom">
        <div className="relative grid min-h-[calc(100vh-80px)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-16">
          
          {/* Decorative vertical text */}
          <div className="absolute left-0 top-1/2 hidden -translate-x-8 -translate-y-1/2 -rotate-90 lg:block">
            <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-secondary/40">
              Crafting better living spaces since 2026
            </span>
          </div>

          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                Renovation · Carpentry · Interiors
              </span>
            </div>

            <h1 className="text-[4.5rem] font-medium leading-[0.88] tracking-[-0.06em] text-secondary sm:text-6xl lg:text-[7rem]">
              We build
              <br />
              <span className="font-serif italic text-primary">
                spaces
              </span>
              <br />
              you remember.
            </h1>

            <p className="mt-8 max-w-md text-[15px] leading-7 text-muted">
              From thoughtful renovations to custom carpentry, we turn
              ordinary rooms into considered spaces built around your life.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-5 bg-secondary px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary"
              >
                Start your project

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>

              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-4 text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                Explore our work
                <span>↓</span>
              </Link>
            </div>

            {/* Small stats */}
            <div className="mt-14 flex gap-10 border-t border-secondary/10 pt-6">
              <div>
                <p className="text-2xl font-semibold text-secondary">25+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Projects
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-secondary">08</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Years craft
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-secondary">100%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Personal
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative h-[580px] sm:h-[650px] lg:h-[720px]">
            
            {/* Main image */}
            <div
              className="absolute right-0 top-0 h-[82%] w-[82%] overflow-hidden bg-[#d9d0c2] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85')",
              }}
            >
              {/* Image overlay */}
              <div className="absolute inset-0 bg-black/5" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/70">
                    Featured project
                  </p>

                  <p className="mt-2 text-xl font-medium">
                    The Oak Residence
                  </p>
                </div>

                <span className="text-4xl font-light text-white/50">
                  01
                </span>
              </div>
            </div>

            {/* Floating information card */}
            <div className="absolute bottom-[8%] left-0 w-[48%] bg-secondary p-6 text-white shadow-xl sm:p-7">
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary">
                Our approach
              </span>

              <p className="mt-4 text-lg font-medium leading-snug sm:text-xl">
                Good spaces aren't loud.
                <br />
                They're intentional.
              </p>

              <div className="mt-6 h-px w-10 bg-white/30" />
            </div>

            {/* Number marker */}
            <div className="absolute right-[3%] top-[8%] flex h-12 w-12 items-center justify-center rounded-full border border-secondary/20 bg-[#f8f7f4]/80 backdrop-blur-sm">
              <span className="text-xs font-medium">01</span>
            </div>

            {/* Vertical label */}
            <span className="absolute bottom-[23%] right-[-2%] rotate-90 text-[9px] uppercase tracking-[0.4em] text-secondary/40">
              Architecture of everyday life
            </span>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="hidden border-t border-secondary/10 md:block">
        <div className="container-custom flex h-14 items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.3em] text-muted">
            Scroll to discover
          </span>

          <span className="text-xs text-muted">↓</span>

          <span className="text-[9px] uppercase tracking-[0.3em] text-muted">
            01 — 06
          </span>
        </div>
      </div>
    </section>
  );
}