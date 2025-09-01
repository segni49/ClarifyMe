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
    <main className="w-full min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] flex flex-col items-center justify-start py-16 animate-fadeInUp">
      <div className="w-full max-w-7xl flex flex-col gap-12 px-4">
        <form
          onSubmit={handleClarify}
          className="bg-white/80 rounded-2xl shadow-2xl p-10 flex flex-col gap-8 w-full max-w-2xl mx-auto animate-scaleIn"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F4C5C] mb-2 animate-fadeInUp text-center">
            Clarify a Topic
          </h1>
          <div className="relative">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="peer px-4 pt-6 pb-2 rounded-xl border border-[#0F4C5C] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2DC7] bg-[#FFFFFF] text-lg"
              required
              placeholder=" "
            />
            <label
              htmlFor="topic"
              className="absolute left-4 top-2 text-[#4B5563] text-base transition-all peer-focus:text-[#6C2DC7] peer-focus:top-1 peer-valid:top-1 peer-valid:text-[#6C2DC7]"
            >
              Topic (e.g. Quantum Physics)
            </label>
          </div>
          <div className="relative">
            <textarea
              id="confusion"
              value={confusion}
              onChange={(e) => setConfusion(e.target.value)}
              className="peer px-4 pt-6 pb-2 rounded-xl border border-[#0F4C5C] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2DC7] bg-[#FFFFFF] text-lg"
              required
              placeholder=" "
              rows={4}
            />
            <label
              htmlFor="confusion"
              className="absolute left-4 top-2 text-[#4B5563] text-base transition-all peer-focus:text-[#6C2DC7] peer-focus:top-1 peer-valid:top-1 peer-valid:text-[#6C2DC7]"
            >
              What confuses you?
            </label>
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-[#6C2DC7] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] animate-scaleIn"
            disabled={loading}
          >
            {loading ? "Clarifying..." : "Clarify"}
          </button>
          {error && (
            <div className="text-[#8B1E3F] mt-2 animate-fadeInUp text-center text-lg">
              {error}
            </div>
          )}
        </form>

        {result && (
          <ClarifyCard
            topic={result.topic}
            summary={result.summary}
            quiz={result.quiz}
          />
        )}

        {recommendations.length > 0 && (
          <section className="w-full mt-8 bg-gradient-to-br from-[#6C2DC7] to-[#1A1A1A] rounded-2xl shadow-2xl p-10 animate-fadeInUp">
            <h2 className="text-3xl font-extrabold text-white mb-8 animate-fadeInUp text-center">
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