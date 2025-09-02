"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[var(--clr-bg-light)] to-[var(--clr-bg-dark)] flex items-center justify-center font-sans px-6 py-12">
      <section className="bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-xl shadow-2xl w-full flex flex-col items-center transition-all animate-scaleIn border border-[var(--clr-bg-dark)] px-6 py-12">
        <Image src="/icons/logo.svg" alt="ClarifyMe Logo" width={48} height={48} className="mb-2" />
        <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] mb-2 text-center leading-tight tracking-tight animate-fadeInUp">
          Welcome to ClarifyMe
        </h1>
        <p className="text-base text-[var(--clr-text-muted)] mb-2 text-center max-w-sm animate-fadeInUp leading-relaxed">
          Your AI-powered learning companion. Sign in with Google to simplify complex topics, generate quizzes, and track your learning journey.
        </p>
        {error && (
          <div className="w-full text-center text-[var(--clr-error)] text-sm mb-2 animate-fadeInUp" role="alert">
            {error}
          </div>
        )}
        <button
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              await signIn("google", { callbackUrl: "/clarify" });
            } catch {
              setError("Sign in failed. Please try again.");
              setLoading(false);
            }
          }}
          className={`w-full min-h-[48px] px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-accent)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          aria-label="Sign in with Google"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
          ) : (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="mr-2"><path d="M21.35 11.1H12v2.8h5.35c-.23 1.2-1.4 3.5-5.35 3.5-3.22 0-5.85-2.68-5.85-6s2.63-6 5.85-6c1.84 0 3.07.79 3.77 1.47l2.58-2.51C17.07 3.58 14.76 2.5 12 2.5 6.73 2.5 2.5 6.73 2.5 12s4.23 9.5 9.5 9.5c5.48 0 9.13-3.85 9.13-9.27 0-.62-.07-1.23-.18-1.83z"/></svg>
          )}
          Sign in with Google
        </button>
      </section>
    </main>
  );
}