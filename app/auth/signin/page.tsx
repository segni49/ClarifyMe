"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--clr-bg)] flex items-center justify-center py-8 px-4 font-sans">
      <section className="bg-[var(--clr-surface)] rounded-xl shadow-lg p-8 w-full max-w-md mx-auto flex flex-col items-center gap-8 transition-all animate-scaleIn border border-[var(--clr-border)]">
  <Image src="/logo.svg" alt="ClarifyMe Logo" width={48} height={48} className="mb-2" />
        <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] mb-2 text-center leading-tight tracking-tight animate-fadeInUp">
          Welcome to ClarifyMe
        </h1>
        <p className="text-base text-[var(--clr-text-light)] mb-2 text-center max-w-sm animate-fadeInUp leading-relaxed">
          Your AI-powered learning companion. Sign in with Google to simplify complex topics, generate quizzes, and track your learning journey.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/clarify" })}
          className="w-full min-h-[48px] px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-secondary)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] flex items-center justify-center gap-2"
          aria-label="Sign in with Google"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="mr-2"><path d="M21.35 11.1H12v2.8h5.35c-.23 1.2-1.4 3.5-5.35 3.5-3.22 0-5.85-2.68-5.85-6s2.63-6 5.85-6c1.84 0 3.07.79 3.77 1.47l2.58-2.51C17.07 3.58 14.76 2.5 12 2.5 6.73 2.5 2.5 6.73 2.5 12s4.23 9.5 9.5 9.5c5.48 0 9.13-3.85 9.13-9.27 0-.62-.07-1.23-.18-1.83z"/></svg>
          Sign in with Google
        </button>
      </section>
    </main>
  );
}