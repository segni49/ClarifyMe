import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[var(--clr-bg-dark)] to-[var(--clr-bg-light)] border-t border-[var(--clr-bg-dark)] text-[var(--clr-text-muted)] w-full mt-auto transition-all">
  <div className="w-full flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/icons/logo.svg" alt="ClarifyMe Logo" width={36} height={36} />
          <span className="font-bold text-2xl tracking-tight text-[var(--clr-accent)]">ClarifyMe</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-8 text-base font-medium" aria-label="Footer navigation">
          <a href="/clarify" className="hover:text-[var(--clr-primary)] px-2 py-1 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Clarify">Clarify</a>
          <a href="/journal" className="hover:text-[var(--clr-primary)] px-2 py-1 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Journal">Journal</a>
          <a href="/me" className="hover:text-[var(--clr-primary)] px-2 py-1 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Profile">Me</a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-[var(--clr-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]">
            <span className="inline-block p-2 rounded-full bg-[var(--clr-bg-alt)] shadow-lg">
              <svg width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M8 19c7.732 0 12-6.373 12-11.917 0-.181 0-.362-.012-.542A8.18 8.18 0 0022 4.59a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0021.448 3.2a8.224 8.224 0 01-2.605.98A4.107 4.107 0 0015.448 2c-2.266 0-4.104 1.828-4.104 4.084 0 .32.036.634.106.934C7.728 6.87 4.1 5.13 1.67 2.6a4.07 4.07 0 00-.555 2.054c0 1.418.726 2.669 1.826 3.401A4.093 4.093 0 012 7.15v.052c0 1.98 1.41 3.633 3.292 4.012a4.093 4.093 0 01-1.085.144c-.265 0-.52-.026-.77-.075.52 1.62 2.032 2.8 3.827 2.83A8.233 8.233 0 012 17.54a11.616 11.616 0 006.29 1.84" />
              </svg>
            </span>
          </a>
          <a href="https://github.com" aria-label="GitHub" className="hover:text-[var(--clr-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]">
            <span className="inline-block p-2 rounded-full bg-[var(--clr-bg-alt)] shadow-lg">
              <svg width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.22-.253-4.555-1.112-4.555-4.945 0-1.092.39-1.987 1.03-2.686-.104-.253-.447-1.272.098-2.653 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.75-1.025 2.75-1.025.546 1.381.203 2.4.1 2.653.64.699 1.03 1.594 1.03 2.686 0 3.842-2.338 4.688-4.566 4.937.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .269.18.58.688.482C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-[var(--clr-text-light)] mt-6">
        &copy; {new Date().getFullYear()} ClarifyMe. All rights reserved. Contact:{" "}
        <a href="mailto:hello@clarifyme.ai" className="underline hover:text-[var(--clr-primary)] focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]" aria-label="Contact Email">hello@clarifyme.ai</a>
      </div>
    </footer>
  );
}