import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#24302b] text-white">
      <div className="container-custom py-20 md:py-28">
        {/* Top CTA */}
        <div className="grid gap-10 border-b border-white/10 pb-16 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#b8895b]">
              Let's build
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-tight md:text-6xl">
              Have a space in mind?
              <br />
              Let's make it worth living in.
            </h2>
          </div>

          <div className="md:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#b8895b] px-6 py-4 text-sm uppercase tracking-[0.12em] text-[#b8895b] transition-all duration-300 hover:bg-[#b8895b] hover:text-white"
            >
              Start a conversation
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-[0.16em]"
            >
              CRAFTHAUS
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              Renovation, carpentry, and interiors shaped around the way you
              actually live.
            </p>

            <p className="mt-8 text-xs uppercase tracking-[0.16em] text-white/30">
              Built with intention · Designed to last
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[#b8895b]">
              Explore
            </p>

            <div className="flex flex-col gap-4 text-sm text-white/60">
              <Link
                href="/"
                 className="transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/#about"
                className="transition-colors hover:text-white"
              >
                About
              </Link>

              <Link
                href="/#services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/#projects"
                className="transition-colors hover:text-white"
              >
                Projects
              </Link>

              <Link
                href="/blog"
                className="transition-colors hover:text-white"
              >
                Blogs
              </Link>
              <Link
                href="/login"
                 className="transition-colors hover:text-white"
              >
                Admin Login
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[#b8895b]">
              Contact
            </p>

            <div className="flex flex-col gap-4 text-sm text-white/60">
              <a
                href="mailto:hello@crafthaus.com"
                className="transition-colors hover:text-white"
              >
                hello@crafthaus.com
              </a>

              <a
                href="tel:+8801000000000"
                className="transition-colors hover:text-white"
              >
                +880 1000 000 000
              </a>

              <p className="leading-6">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[#b8895b]">
              Follow
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-white/10 text-sm text-white/60 transition-all duration-300 hover:border-[#b8895b] hover:text-[#b8895b]"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-white/10 text-sm text-white/60 transition-all duration-300 hover:border-[#b8895b] hover:text-[#b8895b]"
              >
                <  FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-white/10 text-sm text-white/60 transition-all duration-300 hover:border-[#b8895b] hover:text-[#b8895b]"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>© 2026 CraftHaus. All rights reserved.</p>

          <p className="uppercase tracking-[0.14em]">
            Renovation · Carpentry · Interiors
          </p>
        </div>
      </div>
    </footer>
  );
}