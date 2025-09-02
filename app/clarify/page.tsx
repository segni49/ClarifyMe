"use client";
import { useState } from "react";
import ClarifyCard from "../../components/ClarifyCard";
import RecommendationCard from "../../components/RecommendationCard";

export default function ClarifyPage() {
  const [topic, setTopic] = useState("");
  const [confusion, setConfusion] = useState("");
  type Quiz = {
    questions: { question: string; options: string[]; answer: string }[];
  };
  type Entry = { topic: string; summary: string; quiz: Quiz };
  type Recommendation = {
    title: string;
    url: string;
    type: string;
    affiliate?: string;
  };
  const [result, setResult] = useState<Entry | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClarify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setRecommendations([]);
    try {
      const res = await fetch("/api/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, confusion }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to clarify");
      setResult(data.entry);

      const recRes = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const recData = await recRes.json();
      setRecommendations(recData.recommendations || []);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full min-h-screen bg-[var(--clr-bg)] flex flex-col items-center justify-start py-8 px-4 animate-fadeInUp">
      <div className="w-full max-w-screen-xl flex flex-col gap-12">
        {/* Form */}
        <form
          onSubmit={handleClarify}
          className="bg-[var(--clr-surface)] rounded-xl shadow-lg p-8 flex flex-col gap-8 w-full max-w-2xl mx-auto border border-[var(--clr-border)] backdrop-blur-md"
          aria-label="Clarify Topic Form"
        >
          <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] text-center tracking-tight mb-2">
            Clarify a Topic
          </h1>

          {/* Topic Input */}
          <div className="relative">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="peer px-4 pt-6 pb-2 rounded-xl border border-[var(--clr-border)] w-full focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] bg-[var(--clr-surface)] text-lg"
              required
              placeholder=" "
              aria-label="Topic"
            />
            <label
              htmlFor="topic"
              className="absolute left-4 top-2 text-[var(--clr-text-light)] text-base transition-all peer-focus:text-[var(--clr-primary)] peer-focus:top-1 peer-valid:top-1 peer-valid:text-[var(--clr-primary)]"
            >
              Topic (e.g. Quantum Physics)
            </label>
          </div>

          {/* Confusion Input */}
          <div className="relative">
            <textarea
              id="confusion"
              value={confusion}
              onChange={(e) => setConfusion(e.target.value)}
              className="peer px-4 pt-6 pb-2 rounded-xl border border-[var(--clr-border)] w-full focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] bg-[var(--clr-surface)] text-lg"
              required
              placeholder=" "
              rows={4}
              aria-label="Confusion"
            />
            <label
              htmlFor="confusion"
              className="absolute left-4 top-2 text-[var(--clr-text-light)] text-base transition-all peer-focus:text-[var(--clr-primary)] peer-focus:top-1 peer-valid:top-1 peer-valid:text-[var(--clr-primary)]"
            >
              What confuses you?
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-8 py-4 bg-[var(--clr-primary)] text-white rounded-xl font-bold shadow-lg hover:bg-[var(--clr-secondary)] transition-all text-lg focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] min-h-[48px]"
            disabled={loading}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? "Clarifying..." : "Clarify"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-[var(--clr-error)] mt-2 text-center text-base font-medium" role="alert">
              {error}
            </div>
          )}
        </form>

        {/* Clarification Result */}
        {result && (
          <ClarifyCard
            topic={result.topic}
            summary={result.summary}
            quiz={result.quiz}
          />
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="w-full mt-8 bg-[var(--clr-bg-alt)] rounded-xl shadow-lg p-8 backdrop-blur-md">
            <h2 className="text-3xl font-extrabold text-[var(--clr-accent)] mb-8 text-center tracking-tight">
              Recommended Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recommendations.map((rec, idx) => (
                <RecommendationCard key={idx} rec={rec} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}