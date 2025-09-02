import React from "react";

interface QuizBlockProps {
  quiz: {
    questions: Array<{
      question: string;
      options: string[];
      answer: string;
    }>;
  };
}

export default function QuizBlock({ quiz }: QuizBlockProps) {
  return (
    <section className="relative w-full rounded-2xl shadow-xl p-8 mb-10 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] border-2 border-transparent hover:border-[#2ED3B2] transition-all duration-300 text-white animate-fadeInUp backdrop-blur-md">
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-10 bg-white/10" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#2ED3B2] mb-6 tracking-tight leading-tight">
          Quiz
        </h3>
        <ul className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <li
              key={idx}
              className="p-6 bg-white/90 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200 text-[#1A1A1A]"
            >
              <div className="font-semibold mb-2 text-[#0F4C5C] text-base">
                {q.question}
              </div>
              <ul className="ml-4 list-disc text-[#4B5563] text-sm space-y-1">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <div className="text-sm text-[#6C2DC7] mt-3">
                Answer: <span className="font-semibold">{q.answer}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}