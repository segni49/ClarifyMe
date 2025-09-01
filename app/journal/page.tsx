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

  const { data, error } = useSWR<{ entries: Entry[] }>(
    "/api/journal",
    fetcher
  );
  const entries = data?.entries || [];

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] flex flex-col items-center justify-start py-16 animate-fadeInUp">
      <div className="w-full max-w-7xl flex flex-col gap-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 animate-fadeInUp text-center">
          My Journal
        </h1>

        {error && (
          <div className="text-[#8B1E3F] animate-fadeInUp text-center text-lg">
            Failed to load journal.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {entries.length === 0 ? (
            <div className="text-white animate-fadeInUp text-center text-lg">
              No entries yet.
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