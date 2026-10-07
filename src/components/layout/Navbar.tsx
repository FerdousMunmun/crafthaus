"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHouse } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
  <>
     {/* Premium Moving Line */}
<div className="fixed left-0 top-0 z-[9999] h-[24px] w-full overflow-hidden bg-[#24302b]">
  <div className="flex h-full w-max items-center animate-[premiumLine_18s_linear_infinite]">
    <span className="px-8 text-[9px] font-medium uppercase tracking-[0.35em] text-[#b8895b]">
      CRAFTED ARCHITECTURE
    </span>

    <span className="text-[#dedbd4]">•</span>

    <span className="px-8 text-[9px] font-medium uppercase tracking-[0.35em] text-[#b8895b]">
      INTERIORS + RENOVATION
    </span>

    <span className="text-[#dedbd4]">•</span>

    <span className="px-8 text-[9px] font-medium uppercase tracking-[0.35em] text-[#b8895b]">
      CRAFTHAUS
    </span>

    <span className="px-8 text-[#dedbd4]">•</span>

    <span className="px-8 text-[9px] font-medium uppercase tracking-[0.35em] text-[#b8895b]">
      CRAFTED ARCHITECTURE
    </span>

    <span className="text-[#dedbd4]">•</span>

    <span className="px-8 text-[9px] font-medium uppercase tracking-[0.35em] text-[#b8895b]">
      INTERIORS + RENOVATION
    </span>
  </div>
</div>
    <nav className="border-b border-black/10 bg-[#f8f7f4] pt-6">
      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          {/* House Icon */}
          <FaHouse
            size={17}
            className="
              text-[#b8895b]
              animate-[logoIcon_0.8s_ease-out]
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:rotate-3
            "
          />

          {/* Brand Name */}
          <span
            className="
              text-2xl
              font-semibold
              tracking-[0.14em]
              text-[#24302b]
              animate-[logoText_0.9s_ease-out]
              transition-all
              duration-300
              group-hover:tracking-[0.18em]
            "
          >
            CRAFTHAUS
          </span>

          {/* Subtitle */}
          <span
            className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-[#b8895b]
              sm:block
              animate-[logoSubtitle_1.1s_ease-out]
            "
          >
            01 / Interiors + Renovation
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex">
          <div className="hidden gap-8 md:flex">

            <Link
              href="/#about"
              className="relative text-md text-[#131816] transition-colors duration-300 hover:text-[#b8895b]"
            >
              About
            </Link>

            <Link
              href="/#services"
              className="relative text-md text-[#131816] transition-colors duration-300 hover:text-[#b8895b]"
            >
              Services
            </Link>

            <Link
              href="/#projects"
              className="relative text-md text-[#131816] transition-colors duration-300 hover:text-[#b8895b]"
            >
              Projects
            </Link>

            <Link
              href="/blog"
              className="relative text-md text-[#131816] transition-colors duration-300 hover:text-[#b8895b]"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="relative text-md text-[#131816] transition-colors duration-300 hover:text-[#b8895b]"
            >
              Contact
            </Link>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-[#dedbd4] text-[#24302b] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#dedbd4] bg-[#f8f7f4] md:hidden">
          <div className="container-custom flex flex-col py-4">

            <Link
              href="/#about"
              onClick={closeMenu}
              className="border-b border-[#dedbd4] py-4 text-sm text-[#24302b]"
            >
              About
            </Link>

            <Link
              href="/#services"
              onClick={closeMenu}
              className="border-b border-[#dedbd4] py-4 text-sm text-[#24302b]"
            >
              Services
            </Link>

            <Link
              href="/#projects"
              onClick={closeMenu}
              className="border-b border-[#dedbd4] py-4 text-sm text-[#24302b]"
            >
              Projects
            </Link>

            <Link
              href="/blog"
              onClick={closeMenu}
              className="border-b border-[#dedbd4] py-4 text-sm text-[#24302b]"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="py-4 text-sm text-[#24302b]"
            >
              Contact
            </Link>

          </div>
        </div>
      )}
    </nav>
    </>
  );
}