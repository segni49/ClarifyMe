"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--clr-surface)] shadow-lg border-b border-[var(--clr-border)] transition-all">
      <nav className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="ClarifyMe Home">
          <Image
            src="/logo.svg"
            alt="ClarifyMe Logo"
            width={32}
            height={32}
            className="group-hover:scale-110 transition-transform duration-150"
          />
          <span className="font-bold text-lg tracking-tight text-[var(--clr-accent)] group-hover:text-[var(--clr-primary)] transition-colors duration-150">
            ClarifyMe
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link href="/clarify" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] px-3 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Clarify">Clarify</Link>
          <Link href="/journal" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] px-3 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Journal">Journal</Link>
          <Link href="/me" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] px-3 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Profile">Me</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open Menu"
            className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] min-h-[48px]"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md h-full bg-[var(--clr-surface)] shadow-lg flex flex-col p-6 gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close Menu"
              className="self-end text-[var(--clr-text)] hover:text-[var(--clr-primary)] mb-4 focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]"
              onClick={() => setDrawerOpen(false)}
            >
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 6l8 8M6 14L14 6" />
              </svg>
            </button>
            <Link href="/clarify" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors font-semibold text-lg px-3 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" onClick={() => setDrawerOpen(false)} aria-label="Clarify">Clarify</Link>
            <Link href="/journal" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors font-semibold text-lg px-3 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" onClick={() => setDrawerOpen(false)} aria-label="Journal">Journal</Link>
            <Link href="/me" className="text-[var(--clr-text)] hover:text-[var(--clr-primary)] transition-colors font-semibold text-lg px-3 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" onClick={() => setDrawerOpen(false)} aria-label="Profile">Me</Link>
          </div>
        </div>
      )}
    </header>
  );
}