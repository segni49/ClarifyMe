import React from "react";

interface ClarifyCardProps {
  topic: string;
  summary: string;
  quiz: {
    questions: { question: string; options: string[]; answer: string }[];
  };
}

export default function ClarifyCard({ topic, summary, quiz }: ClarifyCardProps) {
  return (
    <section className="relative rounded-xl shadow-lg p-6 mb-8 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] border-4 border-transparent hover:border-[#6C2DC7] transition-all duration-300 animate-fadeInUp w-full text-white">
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-20 animate-fadeInUp" />
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide animate-fadeInUp">
          {topic}
        </h2>
        <p className="text-base sm:text-lg text-white/90 leading-relaxed animate-fadeInUp">
          {summary}
        </p>

        {quiz && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-[#2ED3B2] mb-2 animate-fadeInUp">
              Quiz
            </h3>
            <ul className="space-y-4">
              {quiz.questions.map((q, idx) => (
                <li
                  key={idx}
                  className="bg-white/80 p-4 rounded-xl shadow hover:scale-105 transition-all duration-300 animate-fadeInUp text-[#1A1A1A]"
                >
                  <div className="font-medium mb-2 text-[#0F4C5C]">
                    {q.question}
                  </div>
                  <ul className="ml-4 list-disc text-[#4B5563]">
                    {q.options.map((opt: string, i: number) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-[#6C2DC7] mt-2">
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