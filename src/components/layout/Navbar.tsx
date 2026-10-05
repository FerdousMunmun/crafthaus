
import Link from "next/link";
import { FaHouse } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="border-b border-black/10 bg-[#f8f7f4]">
      <div className="container-custom flex h-20 items-center justify-between">
       <Link href="/" className="group flex items-center gap-3">
  <FaHouse
    size={17}
    className="text-[#b8895b] transition-transform duration-300 group-hover:-translate-y-0.5"
  />

  <span className="text-2xl font-semibold tracking-[0.14em] text-[#24302b]">
    CRAFTHAUS
  </span>

  <span className="hidden text-[9px] uppercase tracking-[0.18em] text-[#b8895b] sm:block">
    01 / Interiors + Renovation
  </span>
</Link>

        <div className="hidden gap-8 md:flex">
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}