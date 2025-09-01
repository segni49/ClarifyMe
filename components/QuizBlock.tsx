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
    <section className="relative rounded-2xl shadow-2xl p-8 mb-8 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] border-4 border-transparent hover:border-[#6C2DC7] transition-all duration-300 animate-fadeInUp backdrop-blur-lg w-full text-white">
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 bg-white/10 animate-fadeInUp" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#2ED3B2] mb-6 tracking-wide animate-fadeInUp">
          Quiz
        </h3>
        <ul className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <li
              key={idx}
              className="p-6 bg-white/80 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 animate-fadeInUp text-[#1A1A1A]"
            >
              <div className="font-medium mb-2 text-[#0F4C5C] text-lg">
                {q.question}
              </div>
              <ul className="ml-4 list-disc text-[#4B5563]">
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