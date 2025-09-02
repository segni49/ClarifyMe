"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MePage() {
  const { data, error } = useSWR("/api/me", fetcher);
  const user = data?.user;

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[var(--clr-bg-light)] to-[var(--clr-bg-dark)] flex flex-col items-center justify-start animate-fadeInUp px-6 py-12">
      <div className="w-full flex flex-col">
        <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] text-center tracking-tight mb-8">My Profile</h1>

        {error && (
          <div className="text-[var(--clr-error)] text-center text-base font-medium animate-fadeInUp" role="alert">
            Failed to load profile.
          </div>
        )}

        {user && (
          <section className="bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto flex flex-col items-center border border-[var(--clr-bg-dark)] animate-scaleIn">
            <Image
              src={user.image || "/avatars/profile-placeholder.png"}
              alt="Profile Avatar"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-[var(--clr-bg-light)] dark:border-[var(--clr-bg-dark)]"
            />
            <div className="text-2xl font-bold text-[var(--clr-accent)] mb-2">{user.name}</div>
            <div className="text-base text-[var(--clr-text-muted)] mb-2">{user.email}</div>
            <div className="text-base mb-4">Role: <span className="font-bold text-[var(--clr-primary)]">{user.role}</span></div>

            {user.subscription?.status === "active" ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--clr-highlight)] text-white font-bold text-base animate-fadeInUp">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#2ED3B2"/><text x="10" y="15" textAnchor="middle" fontSize="12" fill="#fff">PRO</text></svg>
                PRO Subscription Active
              </div>
            ) : (
              <Link
                href="/billing/subscribe"
                className="px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-accent)] transition-all mt-2 focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] text-base"
                aria-label="Upgrade to PRO"
              >
                Upgrade to PRO
              </Link>
            )}
          </section>
        )}
      </div>
    </main>
  );
}