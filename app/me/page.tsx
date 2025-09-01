"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MePage() {
  const { data, error } = useSWR("/api/me", fetcher);
  const user = data?.user;

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] flex flex-col items-center justify-start py-16 animate-fadeInUp">
      <div className="w-full max-w-7xl flex flex-col gap-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white animate-fadeInUp text-center mb-8">
          My Profile
        </h1>

        {error && (
          <div className="text-[#8B1E3F] animate-fadeInUp text-center text-lg">
            Failed to load profile.
          </div>
        )}

        {user && (
          <section className="bg-white/80 rounded-2xl shadow-2xl p-10 w-full max-w-xl mx-auto flex flex-col items-center animate-scaleIn">
            <Image
              src={user.image || "/favicon.ico"}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mb-6"
            />
            <div className="text-2xl font-bold text-[#0F4C5C] mb-2">
              {user.name}
            </div>
            <div className="text-lg text-[#4B5563] mb-2">{user.email}</div>
            <div className="text-lg mb-4">
              Role:{" "}
              <span className="font-bold text-[#6C2DC7]">{user.role}</span>
            </div>

            {user.subscription?.status === "active" ? (
              <div className="text-green-600 font-bold animate-fadeInUp text-lg">
                PRO Subscription Active
              </div>
            ) : (
              <Link
                href="/api/billing/subscribe"
                className="px-8 py-4 bg-[#6C2DC7] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] animate-scaleIn text-lg"
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