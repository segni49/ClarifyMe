"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MePage() {
  const { data, error } = useSWR("/api/me", fetcher);
  const user = data?.user;

  return (
    <main className="w-full min-h-screen bg-[var(--clr-bg)] flex flex-col items-center justify-start py-8 px-4 animate-fadeInUp">
      <div className="w-full max-w-screen-xl flex flex-col gap-12">
        <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] text-center tracking-tight mb-8">My Profile</h1>

        {error && (
          <div className="text-[var(--clr-error)] text-center text-base font-medium animate-fadeInUp" role="alert">
            Failed to load profile.
          </div>
        )}

        {user && (
          <section className="bg-[var(--clr-surface)] rounded-xl shadow-lg p-8 w-full max-w-md mx-auto flex flex-col items-center border border-[var(--clr-border)] animate-scaleIn">
            <Image
              src={user.image || "/avatars/default.svg"}
              alt="Profile Avatar"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-[var(--clr-bg-alt)]"
            />
            <div className="text-2xl font-bold text-[var(--clr-accent)] mb-2">{user.name}</div>
            <div className="text-base text-[var(--clr-text-light)] mb-2">{user.email}</div>
            <div className="text-base mb-4">Role: <span className="font-bold text-[var(--clr-primary)]">{user.role}</span></div>

            {user.subscription?.status === "active" ? (
              <div className="text-[var(--clr-success)] font-bold text-base animate-fadeInUp">PRO Subscription Active</div>
            ) : (
              <Link
                href="/billing/subscribe"
                className="px-6 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-secondary)] transition-all mt-2 focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] text-base"
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