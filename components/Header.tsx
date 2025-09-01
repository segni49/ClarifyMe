"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] shadow-lg animate-fadeInUp">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/favicon.ico"
            alt="ClarifyMe Logo"
            width={32}
            height={32}
            className="group-hover:scale-110 transition-transform duration-150"
          />
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-[#2ED3B2] transition-colors duration-150">
            ClarifyMe
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          <Link
            href="/clarify"
            className="text-white hover:text-[#2ED3B2] transition-all font-semibold"
          >
            Clarify
          </Link>
          <Link
            href="/journal"
            className="text-white hover:text-[#2ED3B2] transition-all font-semibold"
          >
            Journal
          </Link>
          <Link
            href="/me"
            className="text-white hover:text-[#2ED3B2] transition-all font-semibold"
          >
            Me
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open Menu"
            className="text-white hover:text-[#2ED3B2] focus:outline-none"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-64 h-full bg-gradient-to-br from-[#6C2DC7] to-[#0F4C5C] shadow-lg animate-fadeInUp flex flex-col p-6 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close Menu"
              className="self-end text-white hover:text-[#2ED3B2] mb-4"
              onClick={() => setDrawerOpen(false)}
            >
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 6l8 8M6 14L14 6" />
              </svg>
            </button>
            <Link
              href="/clarify"
              className="text-white hover:text-[#2ED3B2] transition-all font-semibold text-lg"
              onClick={() => setDrawerOpen(false)}
            >
              Clarify
            </Link>
            <Link
              href="/journal"
              className="text-white hover:text-[#2ED3B2] transition-all font-semibold text-lg"
              onClick={() => setDrawerOpen(false)}
            >
              Journal
            </Link>
            <Link
              href="/me"
              className="text-white hover:text-[#2ED3B2] transition-all font-semibold text-lg"
              onClick={() => setDrawerOpen(false)}
            >
              Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}