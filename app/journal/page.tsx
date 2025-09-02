"use client";
import useSWR from "swr";
import JournalEntry from "../../components/JournalEntry";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JournalPage() {
  type Quiz = {
    questions: { question: string; options: string[]; answer: string }[];
  };
  type Entry = {
    id: string;
    topic: string;
    summary: string;
    createdAt: string;
    quiz?: Quiz;
  };

  const { data, error } = useSWR<{ entries: Entry[] }>("/api/journal", fetcher);
  const entries = data?.entries || [];

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[var(--clr-bg-light)] to-[var(--clr-bg-dark)] flex flex-col items-center justify-start animate-fadeInUp px-6 py-12">
      <div className="w-full flex flex-col">
        <h1 className="text-4xl font-extrabold text-[var(--clr-accent)] text-center tracking-tight mb-8">
          My Journal
        </h1>

        {error && (
          <div className="text-[var(--clr-error)] text-center text-base font-medium animate-fadeInUp" role="alert">
            Failed to load journal.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.length === 0 ? (
            <div className="text-[var(--clr-text-muted)] text-center text-base font-medium animate-fadeInUp py-12">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mx-auto mb-4" aria-hidden="true">
                <rect x="8" y="12" width="32" height="24" rx="4" fill="var(--clr-bg-light)" />
                <path d="M16 20h16M16 24h16M16 28h8" stroke="var(--clr-bg-dark)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              No entries yet.<br />Start clarifying topics to see your journal here.
            </div>
          ) : (
            entries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}