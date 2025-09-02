
import React from "react";
import Image from "next/image";

interface ClarifyCardProps {
  topic: string;
  summary: string;
  quiz: {
    questions: { question: string; options: string[]; answer: string }[];
  };
}

export default function ClarifyCard({ topic, summary, quiz }: ClarifyCardProps) {
  return (
    <section className="relative w-full rounded-xl shadow-lg p-6 mb-10 bg-[var(--clr-surface)] border border-[var(--clr-border)] hover:border-[var(--clr-primary)] transition-all duration-300 text-[var(--clr-text)] animate-fadeInUp">
      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[var(--clr-accent)]">
          {topic}
        </h2>
        <p className="text-base sm:text-lg text-[var(--clr-text-light)] leading-relaxed">
          {summary}
        </p>

        {quiz && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-[var(--clr-primary)] mb-4 flex items-center gap-2">
              <Image src="/quiz-icon.svg" alt="Quiz Icon" width={24} height={24} className="inline-block" /> Quiz
            </h3>
            <ul className="space-y-6">
              {quiz.questions.map((q, idx) => (
                <li
                  key={idx}
                  className="bg-[var(--clr-bg-alt)] p-5 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200 text-[var(--clr-text)]"
                >
                  <div className="font-semibold mb-2 text-[var(--clr-accent)] text-base">
                    {q.question}
                  </div>
                  <ul className="ml-4 list-disc text-[var(--clr-text-light)] text-sm space-y-1">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-[var(--clr-primary)] mt-3">
                    Answer: <span className="font-semibold">{q.answer}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}