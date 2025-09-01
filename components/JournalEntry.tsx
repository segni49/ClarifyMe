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
    <article className="relative rounded-2xl shadow-2xl p-8 mb-8 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] border-4 border-transparent hover:border-[#6C2DC7] transition-all duration-300 animate-fadeInUp hover:scale-105 backdrop-blur-lg w-full text-white">
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 bg-white/10 animate-fadeInUp" />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-bold tracking-wide animate-fadeInUp">
            {entry.topic}
          </h3>
          <span className="text-xs bg-gradient-to-r from-[#6C2DC7] to-[#2ED3B2] px-3 py-1 rounded-full shadow-lg animate-fadeInUp">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-base sm:text-lg text-white/90 mb-2 leading-relaxed animate-fadeInUp">
          {entry.summary}
        </p>

        {entry.quiz && (
          <details className="mt-2 animate-fadeInUp">
            <summary className="text-[#2ED3B2] cursor-pointer font-semibold">
              Quiz
            </summary>
            <ul className="ml-4 mt-2 list-disc text-white/80">
              {entry.quiz.questions.map((q, idx) => (
                <li key={idx} className="mb-1">
                  <span className="font-medium text-[#0F4C5C]">
                    {q.question}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-4 py-1 bg-gradient-to-r from-[#6C2DC7] to-[#2ED3B2] text-white text-xs font-bold rounded-full shadow-lg animate-fadeInUp">
            Journal
          </span>
        </div>
      </div>
    </article>
  );
}