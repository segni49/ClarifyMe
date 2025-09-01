import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  // Server Component: cannot use useSWR or client hooks
  return (
    <main className="w-full min-h-screen font-sans tracking-wide leading-relaxed flex flex-col text-[#1A1A1A] bg-[#FFFFFF]">
      {/* Hero Section – Always Visible */}
      <section className="w-full flex flex-col items-center justify-center min-h-[70vh] py-20 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] text-white animate-fadeInUp">
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 animate-fadeInUp drop-shadow-lg tracking-tight">
            ClarifyMe
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 animate-fadeInUp leading-relaxed max-w-2xl">
            AI-powered summaries, quizzes, and curated resources—all in one
            place. Learn smarter, faster, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-scaleIn">
            <Link
              href="/clarify"
              className="px-8 py-4 bg-[#0F4C5C] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2DC7]"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 bg-[#6C2DC7] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C]"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
          <Image
            src="/globe.svg"
            alt="Globe Illustration"
            width={400}
            height={128}
            className="mx-auto opacity-30"
          />
        </div>
      </section>

      {/* Features Section – Hidden on Mobile */}
      <section className="hidden md:block w-full py-20 bg-[#62929e] text-white animate-fadeInUp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {[
            {
              title: "AI-Powered Clarification",
              desc: "Get instant, clear summaries for any topic using advanced AI.",
              icon: "/file.svg",
            },
            {
              title: "Interactive Quizzes",
              desc: "Test your understanding with auto-generated quizzes.",
              icon: "/window.svg",
            },
            {
              title: "Curated Recommendations",
              desc: "Discover the best books and courses for your learning journey.",
              icon: "/next.svg",
            },
          ].map((f) => (
            <article
              key={f.title}
              className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300 animate-scaleIn border-2 border-transparent hover:border-[#6C2DC7]"
            >
              <Image src={f.icon} alt={f.title} width={56} height={56} />
              <h3 className="text-2xl font-bold text-[#0F4C5C] text-center animate-fadeInUp">
                {f.title}
              </h3>
              <p className="text-center text-[#4B5563] text-lg">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing Section – Always Visible */}
      <section className="w-full py-20 bg-[#42717c] text-white animate-fadeInUp">
        <div className="px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 animate-fadeInUp text-center">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <article className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-scaleIn border-2 border-transparent hover:border-[#6C2DC7]">
              <h3 className="text-2xl font-bold text-[#0F4C5C] mb-2">
                STUDENT
              </h3>
              <p className="text-[#4B5563] mb-4 text-lg">
                Free tier with limited clarifications and journal access.
              </p>
              <span className="text-3xl font-bold text-[#6C2DC7] mb-2">
                Free
              </span>
              <span className="text-xs text-[#4B5563]">
                Up to 5 clarifications per day
              </span>
            </article>
            <article className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-scaleIn border-2 border-[#6C2DC7]">
              <h3 className="text-2xl font-bold text-[#0F4C5C] mb-2">PRO</h3>
              <p className="text-[#4B5563] mb-4 text-lg text-center">
                Unlimited clarifications, export journal, premium recommendations.
              </p>
              <span className="text-3xl font-bold text-[#6C2DC7] mb-2">
                $10/mo
              </span>
              <Link
                href="/billing/subscribe"
                className="px-8 py-3 bg-[#6C2DC7] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C]"
              >
                Upgrade to PRO
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}