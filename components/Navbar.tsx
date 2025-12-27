"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavItem = { name: string; href: string; section?: string };
const navLinks: NavItem[] = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Desain", href: "/templates" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sticky effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Header */}
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "h-[70px] bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "h-[80px] bg-primary/95 backdrop-blur-md border-b border-transparent shadow-none"
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Beranda"
            className="flex shrink-0 items-center gap-2 group"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === link.href ? "text-white font-bold" : "text-emerald-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg bg-white text-primary hover:bg-emerald-50 hover:shadow-emerald-900/20"
            >
              Hubungi Kami
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="group relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border p-2.5 shadow-sm transition-all md:hidden bg-white/10 border-white/20 hover:bg-white/20"
              aria-label="Toggle menu"
            >
              <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-transform duration-300", open && "rotate-45 translate-y-2")} />
              <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-opacity duration-300", open && "opacity-0")} />
              <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-transform duration-300", open && "-rotate-45 -translate-y-2")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - OUTSIDE header, with high z-index */}
      <div
        className={clsx(
          "fixed inset-0 z-[55] md:hidden transition-all duration-300",
          open ? "visible pointer-events-auto" : "invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={clsx(
            "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Card Container - positioned below header */}
        <div className="absolute top-[85px] left-4 right-4">
          <div
            className={clsx(
              "w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 transition-all duration-300",
              open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
            )}
          >
            {/* Card Header with Logo & Close Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
                <span className="text-lg font-bold text-slate-800">webkeun</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-5 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
