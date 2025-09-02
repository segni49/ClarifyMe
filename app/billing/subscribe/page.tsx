"use client";
import React, { useState } from "react";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/subscribe", { method: "POST" });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || "Failed to initiate payment.");
      }
    } catch {
      setError("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 bg-[var(--clr-bg)] animate-fadeInUp">
      <section className="w-full max-w-md p-8 bg-[var(--clr-surface)] rounded-xl shadow-lg border border-[var(--clr-border)] backdrop-blur-md text-[var(--clr-text)] flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold mb-2 text-[var(--clr-accent)] tracking-tight text-center">Upgrade to Pro</h1>
        <p className="mb-2 text-base text-[var(--clr-text-light)] leading-relaxed text-center">
          Unlock unlimited access to all features for just <strong>$9.99/month</strong>.
        </p>
        <button
          className="w-full min-h-[48px] px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-secondary)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleSubscribe}
          disabled={loading}
          aria-busy={loading ? 'true' : 'false'}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="var(--clr-secondary)" strokeWidth="4" opacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" stroke="var(--clr-secondary)" strokeWidth="4"/></svg>
              Processing...
            </span>
          ) : "Subscribe with Chapa"}
        </button>
        {error && (
          <p className="mt-4 text-sm text-[var(--clr-error)] text-center" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}