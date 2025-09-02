import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
  <main className="w-full min-h-screen font-sans tracking-tight leading-relaxed flex flex-col bg-[var(--clr-bg-light)] text-[var(--clr-text-primary)] px-6 py-12">
      {/* Hero Section */}
  <section className="w-full flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-[var(--clr-bg-light)] to-[var(--clr-bg-dark)] text-[var(--clr-text-primary)] px-6 py-12">
        <div className="w-full text-center flex flex-col">
          <Image src="/icons/logo.svg" alt="ClarifyMe Logo" width={80} height={80} className="mx-auto mb-2" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight animate-fadeInUp text-[var(--clr-accent)]">
            ClarifyMe
          </h1>
          <p className="text-lg md:text-2xl text-[var(--clr-text-muted)] mb-4 leading-relaxed max-w-2xl mx-auto animate-fadeInUp">
            AI-powered summaries, quizzes, and curated resources—all in one place. Learn smarter, faster, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-scaleIn">
            <Link
              href="/clarify"
              className="px-8 py-4 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-accent)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] min-h-[48px]"
              aria-label="Get Started"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 bg-[var(--clr-accent)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-highlight)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] min-h-[48px]"
              aria-label="Sign In"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
  <section className="w-full bg-[var(--clr-bg-light)] text-[var(--clr-text-primary)] px-6 py-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          {[
            {
              title: "AI-Powered Clarification",
              desc: "Get instant, clear summaries for any topic using advanced AI.",
              icon: "/icons/quiz-icon.svg",
            },
            {
              title: "Interactive Quizzes",
              desc: "Test your understanding with auto-generated quizzes.",
              icon: "/icons/quiz-icon.svg",
            },
            {
              title: "Curated Recommendations",
              desc: "Discover the best books and courses for your learning journey.",
              icon: "/icons/recommend-icon.svg",
            },
          ].map((f) => (
            <article
              key={f.title}
              className="bg-[var(--clr-bg-light)] rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[var(--clr-primary)]"
              role="article"
              aria-label={f.title}
            >
              <Image src={f.icon} alt={f.title} width={56} height={56} />
              <h3 className="text-2xl font-bold text-[var(--clr-accent)] text-center">{f.title}</h3>
              <p className="text-center text-[var(--clr-text-muted)] text-lg">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
  <section className="w-full bg-[var(--clr-bg-dark)] text-[var(--clr-text-primary)] px-6 py-12">
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[var(--clr-accent)] mb-10">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-[var(--clr-bg-light)] rounded-xl shadow-lg p-8 flex flex-col items-center border-2 border-transparent hover:border-[var(--clr-primary)] transition-all" role="article" aria-label="Student Tier">
              <h3 className="text-2xl font-bold text-[var(--clr-accent)] mb-2">STUDENT</h3>
              <p className="text-[var(--clr-text-muted)] mb-4 text-lg text-center">Free tier with limited clarifications and journal access.</p>
              <span className="text-3xl font-bold text-[var(--clr-primary)] mb-2">Free</span>
              <span className="text-xs text-[var(--clr-text-muted)]">Up to 5 clarifications per day</span>
            </article>
            <article className="bg-[var(--clr-bg-light)] rounded-xl shadow-lg p-8 flex flex-col items-center border-2 border-[var(--clr-primary)] transition-all" role="article" aria-label="Pro Tier">
              <h3 className="text-2xl font-bold text-[var(--clr-accent)] mb-2">PRO</h3>
              <p className="text-[var(--clr-text-muted)] mb-4 text-lg text-center">Unlimited clarifications, export journal, premium recommendations.</p>
              <span className="text-3xl font-bold text-[var(--clr-primary)] mb-2">$10/mo</span>
              <Link
                href="/billing/subscribe"
                className="px-8 py-3 bg-[var(--clr-primary)] text-white rounded-xl font-semibold shadow-lg hover:bg-[var(--clr-accent)] transition-all mt-2 focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] min-h-[48px]"
                aria-label="Upgrade to PRO"
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