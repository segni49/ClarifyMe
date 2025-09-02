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
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--clr-bg-light)] to-[var(--clr-bg-dark)] animate-fadeInUp px-6 py-12">
      <section className="w-full bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-xl shadow-2xl border border-[var(--clr-bg-dark)] backdrop-blur-md text-[var(--clr-text-primary)] flex flex-col px-6 py-12">
        <h1 className="text-3xl font-extrabold mb-2 text-[var(--clr-accent)] tracking-tight text-center">Upgrade to Pro</h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-xl shadow p-6 flex flex-col items-center border border-[var(--clr-bg-dark)]">
            <h2 className="text-xl font-bold text-[var(--clr-accent)] mb-2">STUDENT</h2>
            <p className="text-[var(--clr-text-muted)] mb-2 text-center">Free tier with limited clarifications and journal access.</p>
            <span className="text-2xl font-bold text-[var(--clr-primary)] mb-2">Free</span>
            <span className="text-xs text-[var(--clr-text-muted)]">Up to 5 clarifications per day</span>
          </div>
          <div className="bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-xl shadow p-6 flex flex-col items-center border-2 border-[var(--clr-primary)]">
            <h2 className="text-xl font-bold text-[var(--clr-accent)] mb-2">PRO</h2>
            <p className="text-[var(--clr-text-muted)] mb-2 text-center">Unlimited clarifications, export journal, premium recommendations.</p>
            <span className="text-2xl font-bold text-[var(--clr-primary)] mb-2">$9.99/mo</span>
            <button
              className={`w-full min-h-[48px] px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-accent)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] disabled:opacity-50 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
              onClick={handleSubscribe}
              disabled={loading}
              {...(loading ? { 'aria-busy': 'true' } : {})}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="var(--clr-highlight)" strokeWidth="4" opacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" stroke="var(--clr-highlight)" strokeWidth="4"/></svg>
                  Processing...
                </span>
              ) : "Subscribe with Chapa"}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-4 text-sm text-[var(--clr-error)] text-center animate-fadeInUp" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}