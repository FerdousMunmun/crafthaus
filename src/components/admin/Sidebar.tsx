"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    number: "01",
    label: "Dashboard",
    href: "/admin",
  },
  {
    number: "02",
    label: "Services",
    href: "/admin/services",
  },
  {
    number: "03",
    label: "Projects",
    href: "/admin/projects",
  },
  {
    number: "04",
    label: "Blogs",
    href: "/admin/blogs",
  },
  {
    number: "05",
    label: "Messages",
    href: "/admin/messages",
  },
  { number: "06", label: "SEO", href: "/admin/seo" },
];


export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-[#24302b] text-white">
      {/* Brand */}
      <div className="border-b border-white/10 px-7 py-7">
        <Link href="/" className="block">
          <p className="text-xl font-semibold tracking-[0.14em]">
            CRAFTHAUS
          </p>

          <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#b8895b]">
            Admin / Control
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8">
        <p className="mb-5 px-3 text-[9px] uppercase tracking-[0.2em] text-white/30">
          Manage
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-3 text-sm transition-colors ${isActive
                    ? "bg-[#b8895b] text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span
                  className={`text-[9px] tracking-[0.15em] ${isActive ? "text-white/70" : "text-[#b8895b]"
                    }`}
                >
                  {item.number}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-5">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-3 text-sm text-white/50 transition-colors hover:text-white"
        >
          <span>Back to website</span>
          <span>↗</span>
        </Link>

        <button
          onClick={async () => {
            await authClient.signOut();
            router.push("/login");
          }}
          className="mt-2 flex w-full items-center justify-between px-3 py-3 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span>Logout</span>
          <span>↗</span>
        </button>
      </div>
    </aside>
  );
}