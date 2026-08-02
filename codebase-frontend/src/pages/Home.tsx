import { useEffect, useState } from "react";
import problemlist from "../problemlist.json";

const CODE_LINES = [
  { n: 1, tokens: [{ t: "comment", v: "// two-sum.js" }] },
  { n: 2, tokens: [{ t: "kw", v: "function" }, { t: "fn", v: " twoSum" }, { t: "plain", v: "(nums, target) {" }] },
  { n: 3, tokens: [{ t: "kw", v: "  const" }, { t: "plain", v: " seen = " }, { t: "kw", v: "new" }, { t: "fn", v: " Map" }, { t: "plain", v: "();" }] },
  { n: 4, tokens: [{ t: "kw", v: "  for" }, { t: "plain", v: " (" }, { t: "kw", v: "let" }, { t: "plain", v: " i = 0; i < nums.length; i++) {" }] },
  { n: 5, tokens: [{ t: "kw", v: "    const" }, { t: "plain", v: " need = target - nums[i];" }] },
  { n: 6, tokens: [{ t: "kw", v: "    if" }, { t: "plain", v: " (seen." }, { t: "fn", v: "has" }, { t: "plain", v: "(need)) " }, { t: "kw", v: "return" }, { t: "plain", v: " [seen." }, { t: "fn", v: "get" }, { t: "plain", v: "(need), i];" }] },
  { n: 7, tokens: [{ t: "plain", v: "    seen." }, { t: "fn", v: "set" }, { t: "plain", v: "(nums[i], i);" }] },
  { n: 8, tokens: [{ t: "plain", v: "  }" }] },
  { n: 9, tokens: [{ t: "plain", v: "}" }] },
];

const TOKEN_COLOR: Record<string, string> = {
  comment: "text-[#5c6370]",
  kw: "text-[#c792ea]",
  fn: "text-[#61afef]",
  plain: "text-[#e6edf3]",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "text-[#7ee787]",
  Medium: "text-[#e3b341]",
  Hard: "text-[#f85149]",
};

export default function Home() {
  const [visibleLines, setVisibleLines] = useState(0);
  const preview = (problemlist.problemsetQuestionList as any[]).slice(0, 5);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 180);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div className="min-h-screen bg-[#0b0e14] font-['Inter',sans-serif] text-[#e6edf3]">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <p className="font-['IBM_Plex_Mono',monospace] text-sm text-[#5c6370] mb-4">
            // built for interview prep
          </p>
          <h1 className="font-['IBM_Plex_Mono',monospace] text-4xl md:text-5xl font-semibold leading-tight mb-5">
            Write code.
            <br />
            <span className="text-[#e3b341]">Ship confidence.</span>
          </h1>
          <p className="text-[#8b949e] text-lg mb-8 max-w-md">
            Solve real interview problems, run them instantly against a live
            judge, and track every win as you go.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/Problemset"
              className="font-['IBM_Plex_Mono',monospace] bg-[#e3b341] text-[#0b0e14] font-semibold px-6 py-3 rounded-md hover:bg-[#f0c869] transition-colors"
            >
              $ start --coding
            </a>
            <a
              href="/Signup"
              className="text-[#58a6ff] hover:underline text-sm font-medium"
            >
              Create a free account →
            </a>
          </div>
        </div>

        {/* Right: fake code editor */}
        <div className="rounded-lg border border-[#232935] bg-[#11151c] shadow-2xl overflow-hidden">
          {/* window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#232935] bg-[#0d1117]">
            <span className="w-3 h-3 rounded-full bg-[#f85149]" />
            <span className="w-3 h-3 rounded-full bg-[#e3b341]" />
            <span className="w-3 h-3 rounded-full bg-[#7ee787]" />
            <div className="ml-4 flex gap-4">
              <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#e6edf3] border-b-2 border-[#e3b341] pb-3 -mb-3">
                two-sum.js
              </span>
              <span className="font-['IBM_Plex_Mono',monospace] text-xs text-[#5c6370]">
                notes.md
              </span>
            </div>
          </div>
          {/* code body */}
          <div className="p-5 font-['IBM_Plex_Mono',monospace] text-[13px] leading-6 min-h-[230px]">
            {CODE_LINES.slice(0, visibleLines).map((line) => (
              <div key={line.n} className="flex">
                <span className="w-6 text-[#3b4048] select-none">{line.n}</span>
                <span>
                  {line.tokens.map((tok, i) => (
                    <span key={i} className={TOKEN_COLOR[tok.t]}>
                      {tok.v}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            {visibleLines < CODE_LINES.length && (
              <span className="inline-block w-2 h-4 bg-[#e3b341] animate-pulse align-middle ml-6" />
            )}
          </div>
        </div>
      </section>

      {/* STATUS BAR (stats) */}
      <section className="border-y border-[#232935] bg-[#0d1117]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap gap-x-10 gap-y-2 font-['IBM_Plex_Mono',monospace] text-sm">
          <span className="text-[#8b949e]">
            solved <span className="text-[#e3b341] font-semibold">12</span>
          </span>
          <span className="text-[#8b949e]">
            points <span className="text-[#58a6ff] font-semibold">156</span>
          </span>
          <span className="text-[#8b949e]">
            streak <span className="text-[#7ee787] font-semibold">3🔥</span>
          </span>
        </div>
      </section>

      {/* PROBLEM LIST + PREMIUM */}
      <section className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* file-explorer style list */}
        <div className="lg:col-span-2 rounded-lg border border-[#232935] bg-[#11151c] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#232935] font-['IBM_Plex_Mono',monospace] text-xs text-[#5c6370]">
            problems/
          </div>
          {preview.map((p: any, idx: number) => (
            <a
              key={p.questionFrontendId}
              href={`/Problem/${p.questionFrontendId}`}
              className="flex items-center justify-between px-5 py-3 border-l-2 border-transparent hover:border-[#e3b341] hover:bg-[#161b22] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#5c6370] text-sm font-['IBM_Plex_Mono',monospace] w-6">
                  {idx + 1}
                </span>
                <span className="text-[#e6edf3]">{p.title}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-[#8b949e] font-['IBM_Plex_Mono',monospace]">
                  {typeof p.acRate === "number" ? p.acRate.toFixed(1) : p.acRate}%
                </span>
                <span
                  className={`font-['IBM_Plex_Mono',monospace] ${DIFFICULTY_COLOR[p.difficulty] || "text-[#8b949e]"}`}
                >
                  {p.difficulty}
                </span>
              </div>
            </a>
          ))}
          <a
            href="/Problemset"
            className="block px-5 py-3 text-sm text-[#58a6ff] hover:underline border-t border-[#232935]"
          >
            View all problems →
          </a>
        </div>

        {/* premium card */}
        <div className="rounded-lg border border-[#3a2f6b] bg-gradient-to-br from-[#2d1f66] to-[#4c2a8f] p-6">
          <h3 className="font-['IBM_Plex_Mono',monospace] text-xl font-semibold mb-3">
            Unlock company playbooks
          </h3>
          <p className="text-[#d6c9f0] text-sm mb-6">
            Get problems tagged by real companies and topics, so you practice
            exactly what shows up in interviews.
          </p>
          <button className="w-full bg-[#e3b341] text-[#0b0e14] font-semibold py-2.5 rounded-md hover:bg-[#f0c869] transition-colors">
            Upgrade now
          </button>
        </div>
      </section>
    </div>
  );
}
