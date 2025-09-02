import React from "react";

interface JournalEntryProps {
  entry: {
    topic: string;
    summary: string;
    createdAt: string;
    quiz?: {
      questions: { question: string; options: string[]; answer: string }[];
    };
  };
}

export default function JournalEntry({ entry }: JournalEntryProps) {
  return (
    <article className="relative w-full rounded-xl shadow-lg p-6 mb-8 bg-[var(--clr-surface)] border border-[var(--clr-border)] hover:border-[var(--clr-primary)] transition-all duration-300 text-[var(--clr-text)] animate-fadeInUp hover:scale-[1.02]">
      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold tracking-tight leading-tight text-[var(--clr-accent)]">
            {entry.topic}
          </h3>
          <span className="text-xs bg-[var(--clr-bg-alt)] px-3 py-1 rounded-full shadow text-[var(--clr-text-light)]">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Summary */}
        <p className="text-base sm:text-lg text-[var(--clr-text-light)] leading-relaxed">
          {entry.summary}
        </p>

        {/* Quiz Section */}
        {entry.quiz && (
          <details className="mt-2">
            <summary className="text-[var(--clr-primary)] cursor-pointer font-semibold focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]">
              Quiz
            </summary>
            <ul className="ml-4 mt-2 list-disc text-[var(--clr-text-light)] space-y-2">
              {entry.quiz.questions.map((q, idx) => (
                <li key={idx}>
                  <span className="font-medium text-[var(--clr-accent)]">
                    {q.question}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}

        {/* Tag */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-4 py-1 bg-[var(--clr-primary)] text-white text-xs font-bold rounded-full shadow">
            Journal
          </span>
        </div>
      </div>
    </article>
  );
}