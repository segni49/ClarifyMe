import React from "react";

interface Recommendation {
  title: string;
  url: string;
  type: string;
  affiliate?: string;
}

export default function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <article className="relative w-full rounded-2xl shadow-xl p-8 mb-10 bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] border-2 border-transparent hover:border-[#2ED3B2] transition-all duration-300 text-white animate-fadeInUp hover:scale-[1.02] backdrop-blur-md">
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-10 bg-white/10" />
      <div className="relative z-10 flex flex-col gap-4 items-start">
        {/* Title + Icon */}
        <div className="flex items-center gap-3">
          <span className="inline-block p-2 rounded-full bg-gradient-to-br from-[#6C2DC7] to-[#2ED3B2] shadow-lg">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2v20m10-10H2"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h4 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
            {rec.title}
          </h4>
        </div>

        {/* CTA Button */}
        <a
          href={rec.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#6C2DC7] text-white rounded-lg font-semibold shadow-lg hover:bg-[#2ED3B2] transition-colors"
        >
          View Resource
        </a>

        {/* Affiliate Badge */}
        {rec.affiliate && (
          <span className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-[#6C2DC7] to-[#2ED3B2] text-white text-xs font-bold rounded-full shadow">
            Affiliate
          </span>
        )}

        {/* Type Label */}
        <span className="text-xs text-white/80 mt-2">
          Type:{" "}
          <span className="font-semibold text-[#2ED3B2]">{rec.type}</span>
        </span>
      </div>
    </article>
  );
}