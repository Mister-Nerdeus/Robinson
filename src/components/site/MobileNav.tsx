"use client";

import Link from "next/link";
import type { NavItem } from "@/content/navigation";

type MobileNavProps = {
  links: NavItem[];
  open: boolean;
  onNavigate: () => void;
};

export function MobileNav({ links, open, onNavigate }: MobileNavProps) {
  return (
    <div
      id="mobile-site-nav"
      data-mobile-nav={open ? "open" : "closed"}
      className={`${open ? "mt-2 grid" : "hidden"} gap-2 rounded-xl border border-[#d6c9c9] bg-[#fffaf9] p-2.5 shadow-lg`}
    >
      <nav className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="rounded-lg border border-[#d6c9c9] bg-white px-3 py-2 text-center text-sm font-semibold text-[var(--foreground)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
