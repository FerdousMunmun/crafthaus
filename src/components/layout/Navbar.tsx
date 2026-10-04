
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-black/10 bg-[#f8f7f4]">
      <div className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-[0.15em]">
          CRAFTHAUS
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