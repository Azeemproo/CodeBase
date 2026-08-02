import { useState } from "react";
import problemlist from "../problemlist.json";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "text-[#7ee787]",
  Medium: "text-[#e3b341]",
  Hard: "text-[#f85149]",
};

export default function Problemset() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">("All");

  const problems = problemlist.problemsetQuestionList as any[];

  const filtered = problems.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || p.difficulty === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#e6edf3] font-['Inter',sans-serif]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* header */}
        <div className="mb-8">
          <p className="font-['IBM_Plex_Mono',monospace] text-sm text-[#5c6370] mb-2">
            // {filtered.length} problem{filtered.length !== 1 ? "s" : ""}
          </p>
          <h1 className="font-['IBM_Plex_Mono',monospace] text-3xl font-semibold">
            problems/
          </h1>
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#11151c] border border-[#232935] rounded-md px-4 py-2 text-sm text-[#e6edf3] placeholder-[#5c6370] focus:outline-none focus:border-[#e3b341] w-full sm:w-64"
          />
          <div className="flex gap-2 font-['IBM_Plex_Mono',monospace] text-xs">
            {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 rounded-md border transition-colors ${
                  filter === d
                    ? "border-[#e3b341] text-[#e3b341] bg-[#e3b34114]"
                    : "border-[#232935] text-[#8b949e] hover:border-[#3b4048]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* list */}
        <div className="rounded-lg border border-[#232935] bg-[#11151c] overflow-hidden">
          <div className="grid grid-cols-[3rem_1fr_6rem_5rem] gap-4 px-5 py-3 border-b border-[#232935] font-['IBM_Plex_Mono',monospace] text-xs text-[#5c6370] uppercase tracking-wide">
            <span>#</span>
            <span>Title</span>
            <span className="text-right">Acceptance</span>
            <span className="text-right">Difficulty</span>
          </div>

          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-[#5c6370] font-['IBM_Plex_Mono',monospace] text-sm">
              No problems match "{query}"
            </div>
          )}

          {filtered.map((p) => (
            <a
              key={p.questionFrontendId}
              href={`/Problem/${p.questionFrontendId}`}
              className="grid grid-cols-[3rem_1fr_6rem_5rem] gap-4 px-5 py-3 items-center border-l-2 border-transparent hover:border-[#e3b341] hover:bg-[#161b22] transition-colors"
            >
              <span className="text-[#5c6370] text-sm font-['IBM_Plex_Mono',monospace]">
                {p.questionFrontendId}
              </span>
              <span className="text-[#e6edf3] truncate">{p.title}</span>
              <span className="text-[#8b949e] text-sm font-['IBM_Plex_Mono',monospace] text-right">
                {typeof p.acRate === "number" ? p.acRate.toFixed(1) : p.acRate}%
              </span>
              <span
                className={`text-sm font-['IBM_Plex_Mono',monospace] text-right ${
                  DIFFICULTY_COLOR[p.difficulty] || "text-[#8b949e]"
                }`}
              >
                {p.difficulty}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}